<?php
class GenericService{

	private $totalResultados = 0;
	public $fim = 25;
	public $inicio = 0;

	function listarByPDOSelect($query, $parametros = array()){
		$db = $this->getPDOAdapter();
		$rows = $db->fetchAll($query, $parametros);
		return $rows;
	}

	function getPDOAdapter(){
		$dir = $_SERVER['DOCUMENT_ROOT'];
		if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
		    $configfile = "$dir/amf_config_win.ini";
		} else {
		    $configfile = "$dir/amf_config_linux.ini";
		}
		$dbConfig = new Zend_Config_Ini($configfile, 'pdo_database');
		return Zend_Db::factory($dbConfig);
	}

	function update($tabela, $campos, $condicoes){
		$db = $this->getPDOAdapter();
		$db->beginTransaction();
		$quantidadeLinhasAtualizadas = 0;
		try {
			$quantidadeLinhasAtualizadas = $db->update($tabela, $campos, $condicoes);
			$db->commit();
		} catch (Zend_Exception $e) {
			$db->rollBack();
			print("{\"success\":false".", \"errorType\":'general'".", \"message\": \"".$e->getMessage()."\"}");
		}
		return $quantidadeLinhasAtualizadas;
	}

	function getTotalResultadosTabela($query){
		$db = Zend_Db_Table::getDefaultAdapter();
		$countQuery = " SELECT COUNT(*) AS TOTAL_RESULTADOS FROM (";
		$countQuery .= $query;
		$countQuery .= " ) sub ";

		$rows = $db->fetchAll($countQuery);
		return $rows[0]['TOTAL_RESULTADOS'];
	}

	function getTotalResultadosQuery($query, $parametros){
		$db = $this->getPDOAdapter();
		$queryTotalResultados = "SELECT COUNT(*) as total FROM (";
		$queryTotalResultados .= $query;
		$queryTotalResultados .= ") totalResultados ";
		$rows = $db->fetchAll($queryTotalResultados, $parametros);

		return $rows[0]['total'];
	}

	function consultarByPDOSelect($query, $parametros){
		$db = $this->getPDOAdapter();

		$this->totalResultados = $this->getTotalResultadosQuery($query, $parametros);

		$query .= " LIMIT ". $this->inicio .",".$this->fim;
		$rows = $db->fetchAll($query, $parametros);
		return $rows;
	}

	function getTotalResultados(){
		return $this->totalResultados;
	}


}
