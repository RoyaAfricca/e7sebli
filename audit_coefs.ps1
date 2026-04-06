$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\coefficients_audit.txt"

try {
    $conn.Open($connectionString)
    
    $query = @"
SELECT 
    n.libenivear, 
    m.libematiar, 
    ms.coefmati
FROM 
    (matisect AS ms 
    INNER JOIN nivescol AS n ON ms.codenive = n.codenive)
    INNER JOIN matiere AS m ON ms.codemati = m.codemati
WHERE 
    n.codenive IN ('312113', '312114', '312413', '312414', '312813', '312814', '312213', '312214', '312223', '312224')
ORDER BY 
    n.codenive, m.libematiar
"@

    $rs = New-Object -ComObject ADODB.Recordset
    $rs.Open($query, $conn)
    
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
    Write-Output "Audit completed to $outputFile"
} catch {
    $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8
}
