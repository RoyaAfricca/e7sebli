$path = "D:\Adel&Mouna\Nouveau dossier (3)\Nouveau dossier (9)\1617\Nouveau dossier (2)\EduservDatabases\BaseAccess\DBEduserv\DBEduserv.mdb"
$conn = New-Object -ComObject ADODB.Connection
$connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$path;"
$outputFile = "e:\Nouveau dossier (12)\philo_audit_3rd.txt"

try {
    $conn.Open($connectionString)
    $rs = New-Object -ComObject ADODB.Recordset
    
    # Query epreuve for Philosophy (0401) in all 312xxx3 levels (3rd year)
    $query = @"
SELECT 
    n.libenivear, 
    e.codetypeepre, 
    te.libetypeeprear, 
    e.nbreepre, 
    e.coefepre
FROM 
    ((epreuve AS e 
    INNER JOIN nivescol AS n ON e.codenive = n.codenive)
    INNER JOIN typeepre AS te ON e.codetypeepre = te.codetypeepre)
WHERE 
    e.codemati = '0401' 
    AND e.codenive LIKE '312%3'
ORDER BY 
    n.libenivear, e.codetypeepre
"@

    $rs.Open($query, $conn)
    "Level`tTypeID`tTypeName`tCount`tCoef" | Out-File -FilePath $outputFile -Encoding utf8
    while (!$rs.EOF) {
        $lv = $rs.Fields.Item("libenivear").Value
        $tid = $rs.Fields.Item("codetypeepre").Value
        $tnm = $rs.Fields.Item("libetypeeprear").Value
        $cnt = $rs.Fields.Item("nbreepre").Value
        $cf = $rs.Fields.Item("coefepre").Value
        "$lv`t$tid`t$tnm`t$cnt`t$cf" | Out-File -FilePath $outputFile -Append -Encoding utf8
        $rs.MoveNext()
    }
    $rs.Close()
    $conn.Close()
    Write-Output "Audit completed."
} catch {
    $_.Exception.Message | Out-File -FilePath $outputFile -Append -Encoding utf8
}
