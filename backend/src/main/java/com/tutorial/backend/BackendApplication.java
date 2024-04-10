package com.tutorial.backend;

import com.tutorial.backend.config.WebClientConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.context.request.RequestContextListener;

@EnableJpaAuditing
@SpringBootApplication
@EnableAspectJAutoProxy
@EnableJpaRepositories(basePackages = "com.tutorial.backend.repository")
@EnableMongoRepositories(basePackages = "com.tutorial.backend")
@Import(WebClientConfig.class)
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	public RequestContextListener requestContextListener(){
		return new RequestContextListener();
	}
}
