package mk.finki.emc_backend.service;

import mk.finki.emc_backend.domain.Product;
import java.util.List;

public interface ProductService {
    List<Product> listAll();

    Product create(Product product);

    void delete(Long id);

    Product update(Long id, Product p);
}