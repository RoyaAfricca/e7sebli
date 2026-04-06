$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\calculation_rules.txt"
try {
    $conn.Open($connectionString)
    $tables = @("typeepre", "parametre", "natumati")
    foreach ($table in $tables) {
        "--- Table: $table ---" | Out-File -FilePath $outputFile -Append -Encoding utf8
        $rs = New-Object -ComObject ADODB.Recordset
        $rs.Open("SELECT * FROM [$table]", $conn)
        $fields = @()
        for ($i=0; $i -lt $rs.Fields.Count; $i++) { $fields += $rs.Fields.Item($i).Name }
        ($fields -join "`t") | Out-File -FilePath $outputFile -Append -Encoding utf8
        while (!$rs.EOF) {
            $vals = @()
            for ($i=0; $i -lt $rs.Fields.Count; $i++) { $vals += $rs.Fields.Item($i).Value }
            ($vals -join "`t") | Out-File -FilePath $outputFile -Append -Encoding utf8
            $rs.MoveNext()
        }
        $rs.Close()
        "" | Out-File -FilePath $outputFile -Append -Encoding utf8
    }
    $conn.Close()
} catch { $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8 }
