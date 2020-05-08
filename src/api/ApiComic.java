package api;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import modelo.bean.Comic;
import modelo.dao.ModeloComic;



/**
 * Servlet implementation class ApiComics
 */
@WebServlet("/ApiComic")
public class ApiComic extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ApiComic() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		int id = Integer.parseInt(request.getParameter("id"));
		ModeloComic modeloComic=new ModeloComic();
		Comic comics=modeloComic.select_id(id);		
		response.setHeader("Access-Control-Allow-Origin", "*"); 
		response.setContentType("application/json");	
				
		JSONObject jsonObject = new JSONObject(comics);
		String jsonString = jsonObject.toString();
		
		

		PrintWriter out = response.getWriter();
		out.print(jsonString);
		out.flush();

		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}