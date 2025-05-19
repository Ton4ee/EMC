package mk.finki.emc_backend.repository;

import mk.finki.emc_backend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> { }