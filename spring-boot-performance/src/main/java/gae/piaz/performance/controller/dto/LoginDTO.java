package gae.piaz.performance.controller.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class LoginDTO {

    @Length(min = 1)
    private String username;

    @Length(min = 1)
    private String password;

}
