package br.com.criandoAPI.proprio.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.criandoAPI.proprio.model.Usuario;

public interface IUsuario extends CrudRepository<Usuario, Integer>{
	
	

}
