package org.acme;

import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.subscription.MultiEmitter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestStreamElementType;

import java.util.concurrent.atomic.AtomicReference;

@Path("/pierre")
public class PierreProgResource {

    private final AtomicReference<MultiEmitter<? super ProgEvent>> eventsEmitter = new AtomicReference<>();

    private final Multi<ProgEvent> events = Multi.createFrom()
            .<ProgEvent>emitter(this.eventsEmitter::set).broadcast().toAllSubscribers();

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello from Quarkus REST";
    }

    @Path("/events")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @RestStreamElementType(MediaType.APPLICATION_JSON)
    public Multi<ProgEvent> events() {
        return events;
    }


    @POST
    @Path("send")
    @Consumes(MediaType.APPLICATION_JSON)
    public void send(ProgEvent progEvent) {
        eventsEmitter.get().emit(progEvent);
    }

    record ProgEvent(String name) {}
}
