$root = "c:\Users\HOGAR\Herd\inmo"
Get-ChildItem -Path $root -Recurse -Filter *.jsx | ForEach-Object {
    $path = $_.FullName
    $text = [System.IO.File]::ReadAllText($path)
    $text2 = $text -replace "import Breadcrumb from '@/Components/Breadcrumb';", ''
    $text2 = $text2 -replace '<Breadcrumb items=\{items\} />', ''
    if ($text2 -ne $text) {
        [System.IO.File]::WriteAllText($path, $text2)
    }
}
# verify
Get-ChildItem -Path $root -Recurse -Filter *.jsx | Select-String -Pattern "import Breadcrumb from '@/Components/Breadcrumb'|<Breadcrumb items=\{items\}" -List | ForEach-Object { $_.Path }
