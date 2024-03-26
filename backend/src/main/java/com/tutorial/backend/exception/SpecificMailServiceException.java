package com.tutorial.backend.exception;

public class SpecificMailServiceException extends Exception {

    public SpecificMailServiceException() {
        super();
    }

    public SpecificMailServiceException(String message) {
        super(message);
    }

    public SpecificMailServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    public SpecificMailServiceException(Throwable cause) {
        super(cause);
    }
}