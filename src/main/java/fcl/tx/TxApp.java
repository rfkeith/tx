/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fcl.tx;

import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.media.sse.SseFeature;
import org.glassfish.jersey.server.ResourceConfig;

/**
 *
 * @author rfk
 */
@ApplicationPath("/rest")

public class TxApp extends ResourceConfig{
    public TxApp() {        
        register(SseFeature.class);
        register(DocumentEventsResource.class);
    }
}
