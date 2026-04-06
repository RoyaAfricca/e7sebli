$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\sport_audit.txt"

try {
    $conn.Open($connectionString)
    # Search for all sections related to Sport/Sportif
    $sql = "SELECT codesect, libesectar FROM sectense WHERE libesectar LIKE '*رياضة*' OR libesectar LIKE '*Sport*'"
    $rs = New-Object -ComObject ADODB.Recordset
    $rs.Open($sql, $conn)
    "--- Sections Found ---" | Out-File -FilePath $outputFile -Append -Encoding utf8
    while (!$rs.EOF) {
        ($rs.Fields.Item('codesect').Value.ToString() + " : " + $rs.Fields.Item('libesectar').Value) | Out-File -FilePath $outputFile -Append -Encoding utf8
        $rs.MoveNext()
    }
    $rs.Close()
    
    # Check subjects for year 1 if sport exists
    $sqlSub = "SELECT codemati, libematiar, coeffmati FROM matisect WHERE codenive='1' AND codesect LIKE '*7*'" # 7 is often Sport or specific ID
    # Better: list matisect for any nivel=1
    $conn.Close()
} catch {
    $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8
}
