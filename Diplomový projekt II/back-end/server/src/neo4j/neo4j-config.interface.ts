import { Connection } from 'cypher-query-builder';
import { Driver } from 'neo4j-driver';

export type Neo4jScheme =
  | 'neo4j'
  | 'neo4j+s'
  | 'neo4j+ssc'
  | 'bolt'
  | 'bolt+s'
  | 'bolt+ssc';

export interface Neo4jConfig {
  scheme: Neo4jScheme;
  host: string;
  port: string | number;
  username: string;
  password: string;
  database?: string;
}

export type ConnectionWithDriver = Connection & {
  driver: Driver;
};
