package modelo.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import modelo.Conector;
import modelo.bean.Genero;

public class ModeloGenero extends Conector {
	
	
	public ArrayList<Genero> getAll(){

		ArrayList<Genero> generos = new ArrayList<Genero>();

		try {

			PreparedStatement pst = super.conexion.prepareStatement("select * from generos");

			ResultSet rs = pst.executeQuery();

			while (rs.next()) {

				Genero genero = new Genero();

				genero.setId(rs.getInt("id"));

				genero.setNombre(rs.getString("nombre"));

				generos.add(genero);

			}

		} catch (SQLException e) {

			e.printStackTrace();

		}

		return generos;

	}
	
	public Genero get(int id){

		Genero genero = new Genero();

		try {

			PreparedStatement pst = super.conexion.prepareStatement("select * from generos where id="+id);

			ResultSet rs = pst.executeQuery();

			while (rs.next()) {

				genero.setId(rs.getInt("id"));

				genero.setNombre(rs.getString("nombre"));

			}

		} catch (SQLException e) {

			e.printStackTrace();

		}

		return genero;

	}

}