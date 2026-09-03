$ErrorActionPreference = 'Stop'

$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$outputZip = Join-Path (Split-Path $projectRoot -Parent) 'odeve-care-guide.zip'
$tempBase = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
$tempRoot = Join-Path $tempBase ("odeve-care-guide-verify-{0}" -f [guid]::NewGuid().ToString('N'))
$stageRoot = Join-Path $tempRoot 'stage'
$verifyRoot = Join-Path $tempRoot 'verify'
$excludedNames = @('.git', 'node_modules', 'dist', 'coverage')

try {
    New-Item -ItemType Directory -Path $stageRoot -Force | Out-Null
    New-Item -ItemType Directory -Path $verifyRoot -Force | Out-Null

    Get-ChildItem -LiteralPath $projectRoot -Force |
        Where-Object { $_.Name -notin $excludedNames } |
        ForEach-Object { Copy-Item -LiteralPath $_.FullName -Destination $stageRoot -Recurse -Force }

    if (Test-Path -LiteralPath $outputZip) {
        Remove-Item -LiteralPath $outputZip -Force
    }

    Compress-Archive -Path (Join-Path $stageRoot '*') -DestinationPath $outputZip -CompressionLevel Optimal
    Expand-Archive -LiteralPath $outputZip -DestinationPath $verifyRoot -Force

    Push-Location $verifyRoot
    try {
        npm ci
        if ($LASTEXITCODE -ne 0) { throw "npm ci failed with exit code $LASTEXITCODE" }
        npm test
        if ($LASTEXITCODE -ne 0) { throw "npm test failed with exit code $LASTEXITCODE" }
        npm run build
        if ($LASTEXITCODE -ne 0) { throw "npm run build failed with exit code $LASTEXITCODE" }
    }
    finally {
        Pop-Location
    }

    $zipInfo = Get-Item -LiteralPath $outputZip
    Write-Output ("PACKAGE_OK path={0} bytes={1}" -f $zipInfo.FullName, $zipInfo.Length)
}
finally {
    $resolvedTempRoot = [System.IO.Path]::GetFullPath($tempRoot)
    if ($resolvedTempRoot.StartsWith($tempBase, [System.StringComparison]::OrdinalIgnoreCase) -and
        (Split-Path $resolvedTempRoot -Leaf).StartsWith('odeve-care-guide-verify-')) {
        if (Test-Path -LiteralPath $resolvedTempRoot) {
            Remove-Item -LiteralPath $resolvedTempRoot -Recurse -Force
        }
    }
    else {
        throw "Refusing to clean unexpected temporary path: $resolvedTempRoot"
    }
}
