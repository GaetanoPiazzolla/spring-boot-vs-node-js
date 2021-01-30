package gae.piaz.performance.service.impl;

import gae.piaz.performance.model.Order;
import gae.piaz.performance.repository.OrderRepository;
import gae.piaz.performance.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
* Generated by Springboot-3layer-Generator at Jan 6, 2021, 8:30:41 PM
*/
@Service
public class OrderServiceBean implements OrderService {

    @Autowired
    private OrderRepository repository;

    @Override
    public Order create(Order entity) {
        return repository.save(entity);
    }

    @Override
    public Order update(Order entity) {
        return repository.save(entity);
    }

    @Override
    public Page<Order> read(Order entity, Pageable pageable) {
        Example<Order> example = Example.of(entity);
        return repository.findAll(example,pageable);
    }

    @Override
    public Order readOne(Integer primaryKey) {
        return repository.getOne(primaryKey);
    }

    @Override
    public void delete(Integer primaryKey) {
        repository.deleteById(primaryKey);
    }
}