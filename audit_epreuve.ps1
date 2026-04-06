$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\epreuve_audit.txt"

try {
    $conn.Open($connectionString)
    
    # Try to find a table that links tests to calculation rules
    $tables = @("typeepre", "matiere", "matisect")
    
    "--- Epreuve Mapping ---" | Out-File -FilePath $outputFile -Encoding utf8
    
    # Let's see if there's any table like 'natiere' or 'mati_nive' that has more than just coefficients
    $rs = New-Object -ComObject ADODB.Recordset
    # Query matisect again but look for all columns
    $rs.Open("SELECT TOP 50 * FROM matisect WHERE codenive LIKE '31223%'", $conn)
    
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
    $conn.Close()
    Write-Output "Audit completed to $outputFile"
} catch {
    $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8
}
