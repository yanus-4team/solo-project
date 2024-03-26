package com.tutorial.backend.exception;

public class MailSendingException extends Exception {

    public MailSendingException(String message) {
        super(message);
    }

    public MailSendingException(String message, Throwable cause) {
        super(message, cause);
    }
}