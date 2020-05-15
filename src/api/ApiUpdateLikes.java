package api;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mysql.jdbc.PreparedStatement;

import modelo.bean.Comic;
import modelo.dao.ModeloComic;

/**
 * Servlet implementation class ApiUpdateLikes
 */
@WebServlet("/ApiUpdateLikes")
public class ApiUpdateLikes extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ApiUpdateLikes() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		int id =Integer.parseInt(request.getParameter("id"));
		Comic comic = new Comic();
        comic.setId(id);
        ModeloComic mComic = new ModeloComic();
		try {
			mComic.updateLike(comic);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setContentType("application/json");
        request.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
			}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
		
        
			}

}
