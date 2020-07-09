
<?php
$dbconn = null;
if(getenv('DATABASE_URL')){
$connectionConfig = parse_url(getenv('DATABASE_URL'));
$host = $connectionConfig['host'];
$user = $connectionConfig['user'];
$password = $connectionConfig['pass'];
$port = $connectionConfig['port'];
$dbname = trim($connectionConfig['path'],'/');
$dbconn = pg_connect(
"host=".$host." ".
"user=".$user." ".
"password=".$password." ".
"port=".$port." ".
"dbname=".$dbname
);
} else {
$dbconn = pg_connect("host=localhost dbname=phpapi");
}


$dbconn = pg_connect("host=localhost dbname=mygigz");

class Gig {
  public $id;
  public $name;
  public $date;
  public $location;
  public $compensation;
  public $notes;


  public function __construct($id, $name, $date, $location, $compensation, $notes){
    $this->id = $id;
    $this->name = $name;
    $this->date = $date;
    $this->location = $location;
    $this->compensation = $compensation;
    $this->notes = $notes;
  }
}

class Gigz {
  static function all(){
    $gigz = array();

    $results = pg_query("SELECT * FROM gigz");

    $row_object = pg_fetch_object($results);
    while($row_object){
      $new_gig = new Gig(
        intval($row_object->id),
        $row_object->name,
        $row_object->date,
        $row_object->location,
        $row_object->compensation,
        $row_object->notes
      );
      $gigz[] = $new_gig;
      $row_object = pg_fetch_object($results);
    }
    return $gigz;
  }

  static function create($gig){
    $query = "INSERT INTO gigz (name, date, location, compensation, notes) VALUES ($1, $2, $3, $4, $5)";
    $query_params = array($gig->name, $gig->date, $gig->location, $gig->compensation, $gig->notes);
    pg_query_params($query, $query_params);
    return self::all();
  }

  static function update($updated_gig){
      $query = "UPDATE gigz SET name = $1, date = $2, location = $3, compensation = $4, notes = $5 WHERE id = $6";
      $query_params = array($updated_gig->name, $updated_gig->date, $updated_gig->location, $updated_gig->compensation, $updated_gig->notes, $updated_gig->id);
      $result = pg_query_params($query, $query_params);
      return self::all();
    }
    static function delete($id){
      $query = "DELETE FROM gigz WHERE id = $1";
      $query_params = array($id);
      $result = pg_query_params($query, $query_params);
      return self::all();
    }
}

 ?>
