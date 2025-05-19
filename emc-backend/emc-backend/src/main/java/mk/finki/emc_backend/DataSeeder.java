package mk.finki.emc_backend;

import mk.finki.emc_backend.domain.Product;
import mk.finki.emc_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            productRepository.save(Product.builder()
                    .name("iPhone 15").price(999.0).quantity(10).build());
            productRepository.save(Product.builder()
                    .name("Galaxy S24").price(899.0).quantity(7).build());
        }
    }
}