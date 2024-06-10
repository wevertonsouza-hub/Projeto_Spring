package br.com.criandoAPI.proprio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.criandoAPI.proprio.model.Usuario;
import br.com.criandoAPI.proprio.repository.IUsuario;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired
	private IUsuario repository;
	
	@GetMapping()
	public List<Usuario> listaUsuarios() {
		return (List<Usuario>) repository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Usuario>  buscarPorId(@PathVariable Integer id) {
		if (repository.existsById(id)) {
			Usuario u = repository.findById(id).get();
			
			return ResponseEntity.ok(u);
		}
		else
			return ResponseEntity.notFound().build();
	}
	
	@PostMapping
	public Usuario gravarUsuario(@RequestBody Usuario usuario) {
		return repository.save(usuario);
	}
	
	@PutMapping
	public Usuario editarUsuario(@RequestBody Usuario usuario) {
		return repository.save(usuario);
	}
	
	@DeleteMapping("/{id}")
	public void excluirUsuario(@PathVariable Integer id) {
		repository.deleteById(id);
	}
	

}
