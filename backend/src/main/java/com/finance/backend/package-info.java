/**
 * <h2>Package: com.finance.backend</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   Entry point of the entire Spring Boot application. Bootstraps the app, 
 *   runs the embedded Tomcat server, and seeds initial data on first startup.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>FinanceBackendApplication.java</b> — Main class that bootstraps and runs the application</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   All packages (Spring scans from here)
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   CommandLineRunner bean here seeds 3 default users and 15 sample 
 *   transactions if DB is empty.
 * </p>
 */
package com.finance.backend;
