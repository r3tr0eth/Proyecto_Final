package modelo.dao;

import java.util.ArrayList;

import modelo.bean.Comic;

public class prueba {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		ModeloComic myComics = new ModeloComic();
		ArrayList<Comic> Comics = myComics.SelectAll();
		for (int i = 0; i < Comics.size(); i++) {
			System.out.println(Comics.get(i));
		}
	
		
	}

}
