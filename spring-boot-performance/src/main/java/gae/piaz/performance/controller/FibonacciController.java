package gae.piaz.performance.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cpu-intensive/")
public class  FibonacciController {

    private final Logger logger = LoggerFactory.getLogger(FibonacciController.class);

    @GetMapping("fibonacci/{num}")
    public Integer getFibonacci(@PathVariable("num") Integer num) {
        return fibo(num);
    }

    @GetMapping("fibonacci-log/{num}")
    public Integer getFibonacciLog(@PathVariable("num") Integer num) {
        return fiboLog(num);
    }

    private Integer fibo(Integer num) {
        if (num < 2) {
            return 1;
        } else {
            return fibo(num - 2) + fibo(num - 1);
        }
    }

    private Integer fiboLog(Integer num) {
        logger.info("num:"+num);
        if (num < 2) {
            return 1;
        } else {
            return fiboLog(num - 2) + fiboLog(num - 1);
        }
    }

}
