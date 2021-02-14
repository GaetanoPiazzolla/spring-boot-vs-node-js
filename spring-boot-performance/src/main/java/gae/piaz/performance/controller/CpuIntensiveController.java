package gae.piaz.performance.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cpu-intensive/")
public class CpuIntensiveController {

    private final Logger logger = LoggerFactory.getLogger(CpuIntensiveController.class);

    @GetMapping("{num}")
    public Integer cpuIntensive(@PathVariable("num") Integer num) {
        return cpuIntensiveFunction(num);
    }

    private Integer cpuIntensiveFunction(Integer num) {
        int result = 0;
        for (double i = Math.pow(num, 7); i >= 0; i--) {
            result += Math.atan(i) * Math.tan(i);
        }
        return result;
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
