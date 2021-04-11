<?php
	$utltimoCaracter = substr($_SERVER['DOCUMENT_ROOT'], -1);
	if ( $utltimoCaracter == '/' ) {
		include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/erp/seguranca.php'); 
		include_once($_SERVER['DOCUMENT_ROOT'].'eHoplon/InitZend.php');	
		include_once($_SERVER['DOCUMENT_ROOT']."eHoplon/lib/fpdf/fpdf.php");
	} else {
		include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/erp/seguranca.php'); 
		include_once($_SERVER['DOCUMENT_ROOT'].'/eHoplon/InitZend.php');
		include_once($_SERVER['DOCUMENT_ROOT']."/eHoplon/lib/fpdf/fpdf.php");
	}
	protegePagina("../../login.php");
	
	class PDF extends FPDF {
		
		// Page header
		function header()  {
			$dataHj = date('d/m/Y');
			$horaHj = date('H:i:s');

			if ( $utltimoCaracter == '/' ) {
				$this->Image($_SERVER["DOCUMENT_ROOT"].'eHoplon/resources/images/logo_e_texto_empresa.jpg', 8, 8, 110);        
			} else {
				$this->Image($_SERVER["DOCUMENT_ROOT"].'/eHoplon/resources/images/logo_e_texto_empresa.jpg', 8, 8, 110);        
			}

			$this->SetFont('Arial', '', 9);
			//Número de página  
			$this->Cell(0,0,utf8_decode('Página: ').$this->PageNo().'/{nb}',0,0,'R');
			$this->Ln(5);
			//Usuário     
			$this->Cell(0, 0, 'Emitido por: '. utf8_decode($_SESSION['NM_LOGIN']),0,0,'R');
			$this->Ln(5);
			//Data/hora  
			$this->Cell(0, 0, 'Data/Hora: '.$dataHj.' '.$horaHj,0,0,'R');

			$this->Ln(19);
		}

		// Page footer
		function footer() {

			// Position at 1.5 cm from bottom
			$this->SetY(-15);
			// Arial italic 8
			$this->SetFont('Arial','',8);
			// Page number
			//$this->Cell(0,10,'Pág. '.$this->PageNo().'/{nb}',0,0,'C');
			$this->Cell(0, 10, utf8_decode($_SESSION['NM_FANTASIA']),0,0,'C');
		}
	  
		var $javascript;
		var $n_js;
	 
		function IncludeJS($script) {
			$this->javascript=$script;
		}
	 
		function _putjavascript() {
			$this->_newobj();
			$this->n_js=$this->n;
			$this->_out('<<');
			$this->_out('/Names [(EmbeddedJS) '.($this->n+1).' 0 R ]');
			$this->_out('>>');
			$this->_out('endobj');
			$this->_newobj();
			$this->_out('<<');
			$this->_out('/S /JavaScript');
			$this->_out('/JS '.$this->_textstring($this->javascript));
			$this->_out('>>');
			$this->_out('endobj');
		}
	 
		function _putresources() {
			parent::_putresources();
			if (!empty($this->javascript)) {
				$this->_putjavascript();
			}
		}
	 
		function _putcatalog() {
			parent::_putcatalog();
			if (isset($this->javascript)) {
				$this->_out('/Names <</JavaScript '.($this->n_js).' 0 R>>');
			}
		}
	  
	}	

  function dataFormat($data){
    $ano = '';
    $mes = '';
    $dia = '';

    if(strlen(trim($data)) == 19){
      $ano = substr($data, 0, 4);
      $mes = substr($data, 5, 2);
      $dia = substr($data, 8, 2);
    }else if(strlen(trim($data)) == 18){
      $dia = '0'.substr($data, 4, 1);
      $mes = substr($data, 0, 3);
      $ano = substr($data, 6, 4);
    }else if(strlen(trim($data)) == 10){
		$ano = substr($data, 0, 4);
		$mes = substr($data, 5, 2);
		$dia = substr($data, 8, 2);
		$retorno = $dia.'/'.$mes.'/'.$ano;
	}
    $retorno = $dia.'/'.$mes.'/'.$ano;
    return $retorno;
  }

  function dataFormatDe_Ymd_Para_dmY($data){
    $ano = substr($data, 0, 4);
    $mes = substr($data, 5, 2);
    $dia = substr($data, 8, 2);
    $retorno = $dia.'/'.$mes.'/'.$ano;
    return $retorno;
  }

  function getDifDiasParaDuasSemanas(){
	  $dataAtual = date('Y-m-d H:i:s');
	  $dataOitoManha = date('Y-m-d H:i:s',(strtotime('08:00:00')));
	  $diaSemana = date( "w", $dataAtual);
	  if($diaSemana == 6){
		  $diaSemana = 0;
	  }
	  
	  return (8 - $diaSemana) + 5;
  }
  
  function dataFormatDe_Ymd_Para_dma($data){
    $ano = substr($data, 2, 2);
    $mes = substr($data, 5, 2);
    $dia = substr($data, 8, 2);
    $retorno = $dia.'/'.$mes.'/'.$ano;
    return $retorno;
  }
  
  function horaFormat($data){
    if(strlen(trim($data)) == 19){
      $hora = substr($data, 11, 2);
      $min = substr($data, 14, 2);
	  $seg = substr($data, 17, 2);       
    }else if(strlen(trim($data)) == 18){
      $hora = substr($data, 11, 2);
      $min = substr($data, 14, 2);  
	  $seg = substr($data, 17, 2);	  
    }    	
    $horaSis = $hora.":".$min.":".$seg; 
    
    return $horaSis;
  }

  function diasEntreDatas($dataDeHoje, $data){
	
	$data1 = explode('/',$dataDeHoje);
	$ano1 = $data1[2]; 
	$mes1 = $data1[1];
	$dia1 = $data1[0];
			
	
	$data2 = explode('/',$data);
	$ano2 = $data2[2];
	$mes2 = $data2[1];
	$dia2 = $data2[0];
	
	$segundos1 = mktime(0,0,0,$mes1,$dia1,$ano1);
	$segundos2 = mktime(0,0,0,$mes2,$dia2,$ano2);
	
	$segundos_diferenca = $segundos1 - $segundos2;
		 
	$dias_diferenca = $segundos_diferenca/(60*60*24);
	
	return $dias_diferenca;
  }


  function horaFormat_Hi($data){
    if(strlen(trim($data)) == 19){
      $hora = substr($data, 11, 2);
      $min = substr($data, 14, 2);
	  $seg = substr($data, 17, 2);       
    }else if(strlen(trim($data)) == 18){
      $hora = substr($data, 11, 2);
      $min = substr($data, 14, 2);  
	  $seg = substr($data, 17, 2);	  
    }    	
    $horaSis = $hora.":".$min; 
    
    return $horaSis;
  }
  
  function formataCpf($cpf){
    $retorno = '';
	if (trim($cpf) != '') {
		$retorno = substr($cpf, 0, 3).'.'.substr($cpf, 3, 3).'.'.substr($cpf, 6, 3).
				   '-'.substr($cpf, 9, 2);
	}
    return $retorno;  
  }

  function formataTelefone($telefone){
	# 99 9999 9999
    $retorno = '';
	if (trim($telefone) != '') {
		$retorno = '('.substr($telefone, 0, 2).') '.substr($telefone, 2, 4).'-'.substr($telefone, 6, 4);
	}
    return $retorno;  
  }

  function formataCelular($celular){
	  # 99 9 9999 9999
    $retorno = '';
	if (trim($celular) != '') {
		$retorno = '('.substr($celular, 0, 2).') '.substr($celular, 2, 1).' '.substr($celular, 3, 4).'-'.substr($celular, 7, 4);
	}
    return $retorno;  
  }
  
  function validarEmail($email){
	$pattern = "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$";
	if (ereg($pattern, $email)){
		return true;
	}else{
		return false;
	}
  }

  function calcularIdade($dataNascimento){
	  $date = new DateTime($dataNascimento ); 
	  $interval = $date->diff( new DateTime( date('Y-m-d') ) ); 
	  return $interval->format( '%Y anos' );
  }

  function headerJSON(){ 
  }

  function msgJson($success, $msg){
  }
?>