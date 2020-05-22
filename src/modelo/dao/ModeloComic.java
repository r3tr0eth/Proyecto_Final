package modelo.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

import modelo.Conector;
import modelo.bean.Comic;
import modelo.bean.Genero;
/**
 * 
 * @author gaizka
 * @version
 */
public class ModeloComic extends Conector {
	/**
	 * Este metodo nos devuelve una lista de comics en base a los datos de la base de datos
	 * @return comics
	 */
	public ArrayList<Comic> SelectAll(){

		ArrayList<Comic> comics = new ArrayList<Comic>();
		ModeloGenero ModeloGen = new ModeloGenero();

		try {

			PreparedStatement pst = super.conexion.prepareStatement("select * from comics");

			ResultSet rs = pst.executeQuery();

			while (rs.next()) {

				Comic comic = new Comic();

				comic.setId(rs.getInt("id"));

				comic.setNombre(rs.getString("nombre"));

				comic.setTitulo(rs.getString("titulo"));
				
				comic.setNum(rs.getInt("num"));
				
				comic.setFecha_publicacion(rs.getDate("fecha_publicacion"));
				
				comic.setImagen(rs.getString("imagen"));
				
				comic.setNum_likes(rs.getInt("num_likes"));
				
				comic.setGenero(ModeloGen.get(rs.getInt("genero_id")));

				comics.add(comic);

			}

		} catch (SQLException e) {

			e.printStackTrace();

		}

		return comics;

	}
	/**
	 * Este metodo nos devuelve un comic con todos sus parametros. 
	 * @param id
	 * @return
	 */
	public Comic select_id(int id){
		
		Comic comic = new Comic();
		ModeloGenero ModeloGen = new ModeloGenero();

		try {

			PreparedStatement pst = super.conexion.prepareStatement("select * from comics where id=?");
			pst.setInt(1,id);
			ResultSet rs = pst.executeQuery();
			
			

			while (rs.next()) {

				

				comic.setId(rs.getInt("id"));

				comic.setNombre(rs.getString("nombre"));

				comic.setTitulo(rs.getString("titulo"));
				
				comic.setNum(rs.getInt("num"));
				
				comic.setFecha_publicacion(rs.getDate("fecha_publicacion"));
				
				comic.setImagen(rs.getString("imagen"));
				
				comic.setNum_likes(rs.getInt("num_likes"));
				
				comic.setGenero(ModeloGen.get(rs.getInt("genero_id")));

			}

		} catch (SQLException e) {

			e.printStackTrace();

		}

		return comic;

	}
	/**
	 * Este metodo actualizamos los likes de un comic
	 * @param comic
	 * @throws SQLException
	 */
    public void updateLike(Comic comic) throws SQLException  {
		
		int id = comic.getId();
			
		PreparedStatement pstUpdate = super.conexion.prepareStatement("update comics set num_likes=num_likes + 1 where id=?");
		pstUpdate.setInt(1,id);
		pstUpdate.executeUpdate();
		
	}
    /**
     * Este metodo borramos un comic a traves de el id del comic
     * @param id
     */
	public void delete(int id) {
		// TODO Auto-generated method stub
		try {
			 PreparedStatement pstDelete = conexion.prepareStatement("DELETE FROM `comics` WHERE `id` = ?");
			 pstDelete.setInt(1, id);
			 pstDelete.execute();
		}catch (SQLException e) {
           e.printStackTrace();
       }
	}
	/**
	 * Este metodo nos ejecuta un Procedimiento almacenado 
	 * @param comic
	 * @throws SQLException
	 */
	public void Insert(Comic comic) throws SQLException{
		
		PreparedStatement insert = super.conexion.prepareStatement("CALL SpInsertComic(?,?,?,?,?,?,?,?)");
		insert.setInt(1,comic.getId());
		insert.setString(2, comic.getNombre());
		insert.setString(3, comic.getTitulo());
		insert.setInt(4,comic.getNum());
		insert.setDate(5,new java.sql.Date(comic.getFecha_publicacion().getTime()));
		insert.setString(6, comic.getImagen());
		insert.setInt(7,comic.getNum_likes());
		insert.setInt(8,comic.getGenero().getId());
		
	}
	/**
	 * Este metodo nos un comic actualizado 
	 * @param comic
	 * @throws SQLException
	 */
	public void Update(Comic comic) throws SQLException {
		PreparedStatement update = super.conexion.prepareStatement("CALL SpUpdateComic(?,?,?,?,?,?,?,?)");
		
		update.setString(1, comic.getNombre());
		update.setString(2, comic.getTitulo());
		update.setInt(3,comic.getNum());
		update.setDate(4,new java.sql.Date(comic.getFecha_publicacion().getTime()));
		update.setString(5, comic.getImagen());
		update.setInt(6,comic.getNum_likes());
		update.setInt(7,comic.getGenero().getId());
		update.setInt(8,comic.getId());
	}
	
	
	
	
}