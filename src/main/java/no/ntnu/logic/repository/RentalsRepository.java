package no.ntnu.logic.repository;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.entity.models.Rentals;

public interface RentalsRepository extends JpaRepository<Rentals, Long> {
  List<Rentals> findByProviderIdAndCarId(
      Long providerId,
      Long carId,
      Pageable pageable);

  List<Rentals> findByRenterId(
      Long renterId);
}