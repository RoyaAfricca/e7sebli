$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\matiere_map.txt"
try {
    $conn.Open($connectionString)
    $rs = New-Object -ComObject ADODB.Recordset
    $rs.Open("SELECT codemati, libematiar FROM matiere", $conn)
    "ID`tName" | Out-File -FilePath $outputFile -Encoding utf8
    while (!$rs.EOF) {
        $id = $rs.Fields.Item("codemati").Value
        $nm = $rs.Fields.Item("libematiar").Value
        "$id`t$nm" | Out-File -FilePath $outputFile -Append -Encoding utf8
        $rs.MoveNext()
    }
    $rs.Close()
    $conn.Close()
} catch { $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8 }
