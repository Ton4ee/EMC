
package mk.finki.emc_backend.service.impl;

import mk.finki.emc_backend.domain.Product;
import mk.finki.emc_backend.repository.ProductRepository;
import mk.finki.emc_backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repo;

    @Override
    public List<Product> listAll() {
        return repo.findAll();
    }

    @Override
    public Product create(Product p) {
        return repo.save(p);
    }

    @Override
    public Product update(Long id, Product p) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setName(p.getName());
                    existing.setPrice(p.getPrice());
                    existing.setQuantity(p.getQuantity());
                    return repo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Product " + id + " not found"));
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
