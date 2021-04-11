<?php 
$utltimoCaracter = substr($_SERVER['DOCUMENT_ROOT'], -1);
if ( $utltimoCaracter == '/' ) {
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/InitZend.php');	
	include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/erp/seguranca.php'); 
} else {
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/InitZend.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/erp/seguranca.php'); 
}
protegePagina("../../login.php");

error_reporting(E_ALL);
ini_set('display_errors', 'off');

$svc = new MenuService();

if(isset($_GET['start'])){
	$svc->setInit($_GET['start']);
}
if(isset($_GET['limit'])){
	$svc->setCount($_GET['limit']);
}

function pai($svc,$pai){ 

	$retorno = "";
	$array_filho = filho($svc,$pai); 
	$total = sizeof($pai);
	$n = 0;
	foreach ($array_filho as $row) {			
		$var2 = "";
		$var3 = "";
		if($n > 0){
			$var2 .= ",";
		} 
		$var2 .= "{";
		$var2 .= '"id": "'.$row['CD_MENU'].'",';	
		$var2 .= '"text": "'.$row['DS_MENU'].'"';
		if($row['SN_TEM_FILHO'] == 'S'){ 	
			$var3 .= ', "children": '; 			
			$var3 .= '['; 
			$pai = pai($svc,$row); 		
			if($pai != ""){
				$var2 .= $var3;
				$var2 .= $pai;
				$var2 .= ']';
			} else {
				$var2 = "";
			}						
		}else if($row['DS_ID_FUNCIONALIDADE']!=''){
			$var2 .= ',"leaf": true,"iconCls":"form_16","hrefTarget": "'.$row['DS_ID_FUNCIONALIDADE'].'",'; 
		}else{ 		
			$var2 = "";
		}
		if($var2 != ""){
			$var2 .= '}'; 				
			$n++;
		}
		$retorno .= $var2;
	}	
	return $retorno;	
}

function filho($svc,$pai){
	$query = "
				SELECT CD_MENU
					  ,DS_MENU
					  ,CD_MENU_PAI
					  ,DS_ID_FUNCIONALIDADE
					  ,IF(TOT_FILHO > 0,'S','N') SN_TEM_FILHO
				  FROM (
						SELECT M.CD_MENU
							  ,M.DS_MENU
							  ,M.CD_MENU_PAI
							  ,F.DS_ID_FUNCIONALIDADE
							  ,( 
								  SELECT COUNT(*) 
									FROM menu M2 
								   WHERE CD_MENU_PAI = M.CD_MENU 
							   ) TOT_FILHO
							  ,NR_ORDEM
						  FROM menu M 
							   LEFT JOIN funcionalidade F ON F.CD_FUNCIONALIDADE = M.CD_FUNCIONALIDADE
						 WHERE M.CD_GRUPO_MENU = ".$_GET['cdGrupoMenu']."  
						   AND M.CD_MENU_PAI = ".$pai['CD_MENU']." 
						   AND M.SN_ATIVO = 'S'
			";
	if ($_SESSION['TP_NIVEL_ACESSO'] != 'A') { //se o nível de acesso do usuário não for administrador, é carregado o menu de acordo com o perfil 
		$query .= "	
						   AND (
								 M.CD_FUNCIONALIDADE IS NULL
								 OR
								 M.CD_FUNCIONALIDADE IN (
														   SELECT PF.CD_FUNCIONALIDADE
															 FROM perfil_funcionalidade PF
															WHERE PF.CD_PERFIL IN (
																					 SELECT PU.CD_PERFIL
																					   FROM perfil_usuario PU
																					  WHERE PU.CD_USUARIO = ".$_SESSION['CD_USUARIO']."
																				  )
														)
							   )
				";
	}
	$query .= "		
						) T_MENU
			   ORDER BY NR_ORDEM
			";
			  
	$elmnts = $svc->getBySelect($query,false);

	return $elmnts;
}

$op = $_GET['op'];

$erro = "Erro desconhecido.";

if($op == ""){
}

else if($op == 'getGrupoMenu'){
	$query = "	
				SELECT GM.CD_GRUPO_MENU
					  ,GM.DS_GRUPO_MENU
					  ,GM.NR_ORDEM
				  FROM grupo_menu GM 
				 WHERE GM.SN_ATIVO = 'S'
			";
	if ($_SESSION['TP_NIVEL_ACESSO'] != 'A') { //se o nível de acesso do usuário não for administrador, é carregado o menu de acordo com o perfil 
		$query .= "		
					   AND (
							 GM.CD_GRUPO_MENU IN (
												   SELECT M.CD_GRUPO_MENU
													 FROM menu M         
													WHERE M.CD_FUNCIONALIDADE IN (
																				   SELECT PF.CD_FUNCIONALIDADE
																					 FROM perfil_funcionalidade PF
																					WHERE PF.CD_PERFIL IN (
																											 SELECT PU.CD_PERFIL
																											   FROM perfil_usuario PU
																											  WHERE PU.CD_USUARIO = ".$_SESSION['CD_USUARIO']."
																										  )
																				 )
												 )
							)
				";
	}
	$query .= "		
			   ORDER BY GM.NR_ORDEM
			";

	$elmnts = $svc->getBySelect($query);
	$json = json_encode($elmnts);
	print("{\"totalCount\":".$svc->getTotal().", \"items\": ".$json."}");
}

else if($op == 'carregarMenu'){
	$query = "
				SELECT CD_MENU
					  ,DS_MENU
					  ,CD_MENU_PAI
					  ,DS_ID_FUNCIONALIDADE
					  ,IF(TOT_FILHO > 0,'S','N') SN_TEM_FILHO
				  FROM (
						SELECT M.CD_MENU
							  ,M.DS_MENU
							  ,M.CD_MENU_PAI
							  ,F.DS_ID_FUNCIONALIDADE
							  ,( 
								  SELECT COUNT(*) 
									FROM menu M2 
								   WHERE CD_MENU_PAI = M.CD_MENU 
							   ) TOT_FILHO
							  ,NR_ORDEM
						  FROM menu M 
							   LEFT JOIN funcionalidade F ON F.CD_FUNCIONALIDADE = M.CD_FUNCIONALIDADE
						 WHERE M.CD_GRUPO_MENU = ".$_GET['cdGrupoMenu']."  
						   AND M.CD_MENU_PAI IS NULL
						   AND M.SN_ATIVO = 'S'
			";
	if ($_SESSION['TP_NIVEL_ACESSO'] != 'A') { //se o nível de acesso do usuário não for administrador, é carregado o menu de acordo com o perfil 
		$query .= "	
						   AND (
								 M.CD_FUNCIONALIDADE IS NULL
								 OR
								 M.CD_FUNCIONALIDADE IN (
														   SELECT PF.CD_FUNCIONALIDADE
															 FROM perfil_funcionalidade PF
															WHERE PF.CD_PERFIL IN (
																					 SELECT PU.CD_PERFIL
																					   FROM perfil_usuario PU
																					  WHERE PU.CD_USUARIO = ".$_SESSION['CD_USUARIO']."
																				  )
														)
							   )
				";
	}
	$query .= "	
						) T_MENU	
			   ORDER BY NR_ORDEM
			";
	
	$elmnts = $svc->getBySelect($query,false);
	
	$contador = 0;
	print('[');	
	$var1 = "";
	foreach ($elmnts as $row) {			
		$var2 = "";
		$var3 = "";
		if($contador > 0){
			$var2 .= ",";
		} 
		$var2 .= "{";
		$var2 .= '"id": "'.$row['CD_MENU'].'",';		
		$var2 .= '"text": "'.$row['DS_MENU'].'"';
		if($row['SN_TEM_FILHO'] == 'S'){ 
			$var3 .= ', "children": '; 			
			$var3 .= '['; 
			$pai = pai($svc,$row); 		
			if($pai != ""){
				$var2 .= $var3;
				$var2 .= $pai;
				$var2 .= ']';
			} else {
				$var2 = "";
			}						
		}else if($row['DS_ID_FUNCIONALIDADE']!=''){
			$var2 .= ',"leaf": true,"iconCls":"form_16","hrefTarget": "'.$row['DS_ID_FUNCIONALIDADE'].'",'; 
		}else{ 		
			$var2 = "";
		}
		if($var2 != ""){
			$var2 .= '}'; 				
			$contador++;
		}
		$var1 .= $var2;
	}	
	$var1 .= ']'; 
	print($var1);
}

else{
	print("'success': false,");
	print("'mensagem': $erro");
}

?>