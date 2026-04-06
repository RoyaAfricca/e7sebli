$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
try {
    $conn.Open($connectionString)
    
    $tables = @("matiere", "matisect", "nivescol", "sectense")
    
    foreach ($table in $tables) {
        Write-Output "--- Table: $table ---"
        $rs = New-Object -ComObject ADODB.Recordset
        $rs.Open("SELECT TOP 20 * FROM [$table]", $conn)
        
        $fields = @()
        for ($i=0; $i -lt $rs.Fields.Count; $i++) {
            $fields += $rs.Fields.Item($i).Name
        }
        Write-Output ($fields -join "`t")
        
        while (!$rs.EOF) {
            $vals = @()
            for ($i=0; $i -lt $rs.Fields.Count; $i++) {
                $vals += $rs.Fields.Item($i).Value
            }
            Write-Output ($vals -join "`t")
            $rs.MoveNext()
        }
        $rs.Close()
        Write-Output ""
    }
    
    $conn.Close()
} catch {
    Write-Error $_.Exception.Message
}
