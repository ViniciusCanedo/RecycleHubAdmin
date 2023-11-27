package br.com.recyclehub.dao;

import br.com.recyclehub.model.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MensagemDao extends JpaRepository<Mensagem, Long> {
}
