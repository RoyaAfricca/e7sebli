$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\deep_search.txt"

try {
    $conn.Open($connectionString)
    
    $tablesRS = $conn.OpenSchema(20) # Tables
    while (!$tablesRS.EOF) {
        $tableName = $tablesRS.Fields.Item("TABLE_NAME").Value
        $tableType = $tablesRS.Fields.Item("TABLE_TYPE").Value
        if ($tableType -eq "TABLE") {
            # Check if this table has a column that might contain our level ID
            try {
                $rs = New-Object -ComObject ADODB.Recordset
                $rs.Open("SELECT COUNT(*) FROM [$tableName] WHERE codenive IN ('312233', '312234', '312413', '312414', '312113', '312114')", $conn)
                $count = $rs.Fields.Item(0).Value
                if ($count -gt 0) {
                    "Table $tableName contains $($count) records for target levels." | Out-File -FilePath $outputFile -Append -Encoding utf8
                }
                $rs.Close()
            } catch {
                # Skip tables that don't have codenive
            }
        }
        $tablesRS.MoveNext()
    }
    
    $conn.Close()
    Write-Output "Deep search completed."
} catch {
    $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8
}
