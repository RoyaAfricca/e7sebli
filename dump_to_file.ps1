$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\db_dump.txt"
"--- DB Dump Start ---" | Out-File -FilePath $outputFile -Encoding utf8

try {
    $conn.Open($connectionString)
    $tables = @("matiere", "matisect", "nivescol", "sectense")
    
    foreach ($table in $tables) {
        "--- Table: $table ---" | Out-File -FilePath $outputFile -Append -Encoding utf8
        $rs = New-Object -ComObject ADODB.Recordset
        $rs.Open("SELECT TOP 100 * FROM [$table]", $conn)
        
        $fields = @()
        for ($i=0; $i -lt $rs.Fields.Count; $i++) {
            $fields += $rs.Fields.Item($i).Name
        }
        ($fields -join "`t") | Out-File -FilePath $outputFile -Append -Encoding utf8
        
        while (!$rs.EOF) {
            $vals = @()
            for ($i=0; $i -lt $rs.Fields.Count; $i++) {
                $v = $rs.Fields.Item($i).Value
                if ($null -eq $v) { $v = "" }
                $vals += $v.ToString().Replace("`t", " ").Replace("`n", " ").Replace("`r", " ")
            }
            ($vals -join "`t") | Out-File -FilePath $outputFile -Append -Encoding utf8
            $rs.MoveNext()
        }
        $rs.Close()
        "" | Out-File -FilePath $outputFile -Append -Encoding utf8
    }
    $conn.Close()
    Write-Output "Dump completed to $outputFile"
} catch {
    $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8
}
