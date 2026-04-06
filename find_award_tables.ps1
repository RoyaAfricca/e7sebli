$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"

try {
    $conn.Open($connectionString)
    $rs = $conn.OpenSchema(20) # Tables
    while (!$rs.EOF) {
        $tn = $rs.Fields.Item("TABLE_NAME").Value
        if ($tn -match "menti|deci|sanct|hono|appr") {
            Write-Output "Found potential table: $tn"
        }
        $rs.MoveNext()
    }
    $conn.Close()
} catch {
    $_.Exception.Message
}
