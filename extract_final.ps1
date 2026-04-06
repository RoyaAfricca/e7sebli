$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
try {
    $conn.Open($connectionString)
    
    # Try with numeric IDs if they are numeric, or strings if they are strings
    $rs = New-Object -ComObject ADODB.Recordset
    # Just check a few rows from matisect to see ID format
    $rs.Open("SELECT TOP 5 codenive FROM matisect", $conn)
    while(!$rs.EOF) {
        Write-Output "ID in matisect: $($rs.Fields.Item(0).Value)"
        $rs.MoveNext()
    }
    $rs.Close()

    $query = @"
SELECT 
    n.libenivear, 
    m.libematiar, 
    ms.coefmati,
    ms.codenive
FROM 
    (matisect AS ms 
    INNER JOIN nivescol AS n ON ms.codenive = n.codenive)
    INNER JOIN matiere AS m ON ms.codemati = m.codemati
WHERE 
    n.niveetud IN (3, 4) AND n.codesect > 30000
ORDER BY 
    n.codenive, m.codemati
"@
    # Codesect for high school seems to start with 31...
    
    $rs.Open($query, $conn)
    $outputFile = "e:\Nouveau dossier (12)\final_coefficients.txt"
    "Level`tSubject`tCoefficient" | Out-File -FilePath $outputFile -Encoding utf8
    
    while (!$rs.EOF) {
        $level = $rs.Fields.Item("libenivear").Value
        $subject = $rs.Fields.Item("libematiar").Value
        $coef = $rs.Fields.Item("coefmati").Value
        "$level`t$subject`t$coef" | Out-File -FilePath $outputFile -Append -Encoding utf8
        $rs.MoveNext()
    }
    $rs.Close()
    $conn.Close()
} catch { Write-Error $_.Exception.Message }
