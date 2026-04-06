$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\raw_matisect.txt"

try {
    $conn.Open($connectionString)
    $rs = New-Object -ComObject ADODB.Recordset
    # Query all records from matisect
    $rs.Open("SELECT codenive, codemati, coefmati FROM matisect", $conn)
    
    "LevelID`tMatiereID`tCoef" | Out-File -FilePath $outputFile -Encoding utf8
    while (!$rs.EOF) {
        $lv = $rs.Fields.Item("codenive").Value
        $mt = $rs.Fields.Item("codemati").Value
        $cf = $rs.Fields.Item("coefmati").Value
        "$lv`t$mt`t$cf" | Out-File -FilePath $outputFile -Append -Encoding utf8
        $rs.MoveNext()
    }
    $rs.Close()
    $conn.Close()
    Write-Output "Raw matisect dumped to $outputFile"
} catch {
    $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8
}
