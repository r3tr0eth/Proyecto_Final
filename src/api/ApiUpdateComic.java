package api;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import modelo.bean.Comic;
import modelo.bean.Genero;
import modelo.dao.ModeloComic;
import modelo.dao.ModeloGenero;

/**
 * Servlet implementation class ApiUpdateComic
 */
@WebServlet("/ApiUpdateComic")
public class ApiUpdateComic extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ApiUpdateComic() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	}
			

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("UTF-8");
		String jsonComic=request.getParameter("comic");
		
		JSONObject jsonObject=new JSONObject(jsonComic);
		
		Comic comic=new Comic();
		comic.setId(jsonObject.getInt("id"));
		comic.setNombre(jsonObject.getString("nombre"));
		comic.setTitulo(jsonObject.getString("titulo"));

		Date fecha_publi=null;
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		
		try {
			fecha_publi=sdf.parse(jsonObject.getString("fecha_publicacion"));
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		comic.setFecha_publicacion(fecha_publi);
		comic.setNum(jsonObject.getInt("num"));
		comic.setImagen(jsonObject.getString("imagen"));
		comic.setNum_likes(jsonObject.getInt("num_likes"));
		Genero genero= new Genero();
		comic.setGenero(genero);		
		
		ModeloComic ModelComic=new ModeloComic();
		
		try {
			ModelComic.Update(comic);
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		try {
			ModelComic.getConexion().close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
        response.setHeader("Access-Control-Allow-Origin","*");

	}

}
