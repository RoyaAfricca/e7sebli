$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
# Try Jet first, then ACE
$providers = @("Microsoft.Jet.OLEDB.4.0", "Microsoft.ACE.OLEDB.12.0")

foreach ($provider in $providers) {
    $connectionString = "Provider=$provider;Data Source=$path;"
    try {
        $conn.Open($connectionString)
        if ($conn.State -eq 1) {
            Write-Output "Successfully opened with $provider"
            $dbSchema = $conn.OpenSchema(20) # Tables
            while (!$dbSchema.EOF) {
                $tableName = $dbSchema.Fields.Item("TABLE_NAME").Value
                $tableType = $dbSchema.Fields.Item("TABLE_TYPE").Value
                if ($tableType -eq "TABLE") {
                    Write-Output "Table: $tableName"
                }
                $dbSchema.MoveNext()
            }
            $conn.Close()
            break
        }
    } catch {
        # Skip and try next
    }
}
