import { Injectable } from '@nestjs/common';
import { node, relation } from 'cypher-query-builder';
import { QueryRepository } from 'src/neo4j/query.repository';

const datasets = [
  {
    datasetName: 'mkt_synthetic',
    datasetDescription: 'mkt_synthetic dataset description',
    firebaseDatasetID: 'jloUpYvlndz8Of1NQv1M',
    firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
    columnAnnotationData: [
      // uid column
      {
        columnName: 'uid',
        annotationId: 'k1l2m3n4o5-p6q7r8s9t0u1', // Entity Identifier
      },
      {
        columnName: 'uid',
        annotationId: 'l2m3n4o5-p6q7r8s9t0v1', // Page View
      },
      // visit_date
      {
        columnName: 'visit_date',
        annotationId: 'f6g7h8i9-j0k1l2m3n4f', // Created At
      },
      {
        columnName: 'visit_date',
        annotationId: 'h8i9j0k1-l2m3n4h', // Updated At
      },
      {
        columnName: 'visit_date',
        annotationId: 'i9j0k1l2-m3n4i', // Deleted At
      },
      {
        columnName: 'visit_date',
        annotationId: 'c0n1v2e3r4s5i6o7n8_r9a0t1e2', // Conversion Rate Analysis
      },

      // utm_source
      {
        columnName: 'utm_source',
        annotationId: 'a1b2c3d4-e5f6-g7h8-i9j0k1l2m3n4a', // UTM Source
      },
      // utm_medium
      {
        columnName: 'utm_medium',
        annotationId: 'b1c2d3e4-f5g6-h7i8-j9k0l1m2n3o4b', // UTM Medium
      },
      // utm_campaign
      {
        columnName: 'utm_campaign',
        annotationId: 'c2d3e4f5-g6h7-i8j9-k0l1m2n3o4p', // UTM Campaign
      },
      // converted
      {
        columnName: 'converted',
        annotationId: 'm3n4o5p6-q7r8s9t0u2', // Flag
      },

      {
        columnName: 'converted',
        annotationId: 'p6q7r8s9t0-u2v3w4x5y6z7', // Conversion
      },

      {
        columnName: 'converted',
        annotationId: 'c0n1v2e3r4s5i6o7n8_r9a0t1e2', // Conversion Rate Analysis
      },

      // CostOfClick
      {
        columnName: 'cost_of_click',
        annotationId: 'a1b2c3d4-e5f6-g7h8-i9j0k1l2m3n4b', // Cost Per Click
      },
    ],
    annotationData: [
      // uid column
      {
        id: 'k1l2m3n4o5-p6q7r8s9t0u1',
        createdAt: new Date('2023-01-07T10:00:00.123Z').toISOString(),
        description:
          'An entity identifier is a unique reference or key that uniquely identifies an entity in a system or dataset.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Entity Identifier',
        shortcut: 'entity_identifier',
      },

      {
        id: 'l2m3n4o5-p6q7r8s9t0v1',
        createdAt: new Date('2023-02-07T10:00:00.123Z').toISOString(),
        description:
          'A page view refers to a single instance of a user viewing a web page. It is a metric used to measure website or application traffic and engagement.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Page View',
        shortcut: 'page_view',
      },

      // visit_date
      {
        id: 'f6g7h8i9-j0k1l2m3n4f',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description: 'The date and time when an entity or record was created.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Created At',
        shortcut: 'created_at',
      },
      {
        id: 'h8i9j0k1-l2m3n4h',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'The date and time when an entity or record was last updated.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Updated At',
        shortcut: 'updated_at',
      },
      {
        id: 'i9j0k1l2-m3n4i',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'The date and time when an entity or record was soft-deleted or marked as deleted.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Deleted At',
        shortcut: 'deleted_at',
      },
      {
        id: 'j0k1l2m3n4-j5o6p7q8r9s0',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'A date represents a specific point in time, typically expressed in the format YYYY-MM-DD. Dates are used to track and reference events, schedules, and durations.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Date',
        shortcut: 'date',
      },

      // utm_source
      {
        id: 'a1b2c3d4-e5f6-g7h8-i9j0k1l2m3n4a',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'Identifies which site sent the traffic (required parameter).',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'UTM Source',
        shortcut: 'utm_source',
      },

      // utm_medium
      {
        id: 'b1c2d3e4-f5g6-h7i8-j9k0l1m2n3o4b',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'Identifies what type of link was used, such as cost per click or email.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'UTM Medium',
        shortcut: 'utm_medium',
      },

      // utm_campaign
      {
        id: 'c2d3e4f5-g6h7-i8j9-k0l1m2n3o4p',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'Identifies a specific product promotion or strategic campaign.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'UTM Campaign',
        shortcut: 'utm_campaign',
      },

      // converted

      {
        id: 'm3n4o5p6-q7r8s9t0u2',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'In data representation, a flag is a binary marker used to indicate the presence (true) or absence (false) of a specific condition or state. Flags are commonly employed to signify the completion or non-completion of a particular task or event.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Flag',
        shortcut: 'flag',
      },

      {
        id: 'p6q7r8s9t0-u2v3w4x5y6z7',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'A conversion represents the successful completion of a predefined goal or desired action. It is a significant outcome that signifies positive user engagement and aligns with the objectives of a business, website, or marketing campaign.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Conversion',
        shortcut: 'conversion',
      },
      {
        id: 'q7r8s9t0u2-v3w4x5y6z7a8b9c0',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'Key Performance Indicator (KPI) is a measurable value that indicates the effectiveness and success of an organization, business process, or specific activity. KPIs are used to evaluate performance against strategic goals and objectives.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'KPI',
        shortcut: 'kpi',
      },

      {
        id: 'c0n1v2e3r4s5i6o7n8_r9a0t1e2',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'Conversion Rate Analysis involves evaluating the relationship between "Converted" events and timestamps. It aims to calculate conversion rates, providing insights into how effectively campaigns perform and how user interactions vary over different time periods.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Conversion Rate Analysis',
        shortcut: 'conversion_rate_analysis',
      },

      {
        id: 'u0s1e2r3_b4e5h6a7v8i9o0r1',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'User Behavior analysis delves into the actions and interactions of users. It is a crucial component of Conversion Rate Analysis, providing insights into user engagement patterns and conversion triggers.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'User Behavior',
        shortcut: 'user_behavior',
      },
      {
        id: 'p2e3r4f5o6r7m8a9n0c1e2_m3e4t5r6i7c8s9',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'Performance Metrics encompass a range of key indicators, including user behavior metrics and conversion rates. They provide a comprehensive view of the effectiveness of strategies and user satisfaction.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Performance Metrics',
        shortcut: 'performance_metrics',
      },

      // cost_of_click
      {
        id: 'a1b2c3d4-e5f6-g7h8-i9j0k1l2m3n4b',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'Cost Per Click (CPC) is a financial metric in marketing. It measures the cost an advertiser pays for each click on their advertisement.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Cost Per Click',
        shortcut: 'cost_per_click',
      },

      {
        id: 'b2c3d4e5-f6g7-h8i9-j0k1l2m3n4c',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'A financial metric is a quantifiable measure used to assess the financial health and performance of a business.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Financial Metric',
        shortcut: 'financial_metric',
      },

      {
        id: 'c3d4e5f6-g7h8-i9j0k1l2m3n4d',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'A metric is a quantifiable measure used for assessing, comparing, and tracking performance.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Metric',
        shortcut: 'metric',
      },

      {
        id: 'f5g6h7i8-j9k0l1m2n3o4s',
        createdAt: new Date('2023-10-07T10:00:00.123Z').toISOString(),
        description:
          'Urchin Tracking Module (UTM) parameters used by marketers to track the effectiveness of online marketing campaigns.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'UTM Parameters',
        shortcut: 'utm_parameters',
      },

      {
        id: 'g6h7i8j9-k0l1m2n3o4t',
        createdAt: new Date('2023-10-07T10:00:00.123Z').toISOString(),
        description:
          'Marketing is the process of identifying customers and "creating, communicating, delivering, and exchanging" goods and services for the satisfaction and retention of those customers. It is one of the primary components of business management and commerce.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Marketing',
        shortcut: 'marketing',
      },
    ],
    relatedAnnotations: [
      // visit_date

      {
        sourceId: 'f6g7h8i9-j0k1l2m3n4f', // Created At
        targetId: 'j0k1l2m3n4-j5o6p7q8r9s0', // Date
      },
      {
        sourceId: 'h8i9j0k1-l2m3n4h', // Updated At
        targetId: 'j0k1l2m3n4-j5o6p7q8r9s0', // Date
      },
      {
        sourceId: 'i9j0k1l2-m3n4i', // Deleted At
        targetId: 'j0k1l2m3n4-j5o6p7q8r9s0', // Date
      },
      // utm_source
      {
        sourceId: 'a1b2c3d4-e5f6-g7h8-i9j0k1l2m3n4a', // UTM Source
        targetId: 'f5g6h7i8-j9k0l1m2n3o4s', // UTM Parameters
      },
      // utm_medium
      {
        sourceId: 'b1c2d3e4-f5g6-h7i8-j9k0l1m2n3o4b', // UTM Medium
        targetId: 'f5g6h7i8-j9k0l1m2n3o4s', // UTM Parameters
      },
      // utm_campaign
      {
        sourceId: 'c2d3e4f5-g6h7-i8j9-k0l1m2n3o4p', // UTM Campaign
        targetId: 'f5g6h7i8-j9k0l1m2n3o4s', // UTM Parameters
      },
      // converted
      {
        sourceId: 'p6q7r8s9t0-u2v3w4x5y6z7', //Conversion
        targetId: 'q7r8s9t0u2-v3w4x5y6z7a8b9c0', // KPI
      },

      {
        sourceId: 'q7r8s9t0u2-v3w4x5y6z7a8b9c0', // KPI
        targetId: 'g6h7i8j9-k0l1m2n3o4t', // Marketing
      },

      {
        sourceId: 'c0n1v2e3r4s5i6o7n8_r9a0t1e2', // Conversion Rate Analysis
        targetId: 'u0s1e2r3_b4e5h6a7v8i9o0r1', // User Behavior
      },

      {
        sourceId: 'u0s1e2r3_b4e5h6a7v8i9o0r1', // User Behavior
        targetId: 'p2e3r4f5o6r7m8a9n0c1e2_m3e4t5r6i7c8s9', // Performance Metrics
      },

      {
        sourceId: 'p2e3r4f5o6r7m8a9n0c1e2_m3e4t5r6i7c8s9', // Performance Metrics
        targetId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4d', // metric
      },

      // cost_of_click
      {
        sourceId: 'a1b2c3d4-e5f6-g7h8-i9j0k1l2m3n4b', // Cost Per Click
        targetId: 'b2c3d4e5-f6g7-h8i9-j0k1l2m3n4c', // Financial Metric
      },

      {
        sourceId: 'b2c3d4e5-f6g7-h8i9-j0k1l2m3n4c', // Financial Metric
        targetId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4d', // Metric
      },

      {
        sourceId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4d', // Metric
        targetId: 'g6h7i8j9-k0l1m2n3o4t', // Marketing
      },

      // others
      {
        sourceId: 'f5g6h7i8-j9k0l1m2n3o4s', // UTM Parameters
        targetId: 'g6h7i8j9-k0l1m2n3o4t', // Marketing
      },
    ],
    columnData: [
      {
        columnName: 'uid',
        columnDescription:
          'Unique Identifier: A unique alphanumeric code assigned to each visitor for identification purposes.',
      },
      {
        columnName: 'visit_date',
        columnDescription:
          'Visit Date: The date when the visitor accessed the website or platform.',
      },
      {
        columnName: 'utm_source',
        columnDescription:
          'UTM Source: The specific source that directed the visitor to the website, often used in UTM parameters for tracking marketing efforts (e.g., "facebook", "google").',
      },
      {
        columnName: 'utm_medium',
        columnDescription:
          'UTM Medium: The general category of the marketing medium that brought the visitor to the website (e.g., "email", "cpc").',
      },
      {
        columnName: 'utm_campaign',
        columnDescription:
          'UTM Campaign: The specific marketing campaign or promotion that led to the visit (e.g., "summer_sale", "holiday_promo").',
      },
      {
        columnName: 'converted',
        columnDescription:
          'Conversion Status: Indicates whether the visitor completed a desired action or goal on the website (e.g., true for conversion, false for non-conversion).',
      },
      {
        columnName: 'cost_of_click',
        columnDescription:
          'Cost of Click: The monetary cost incurred for each click associated with the marketing campaign or source that brought the visitor to the website.',
      },
    ],
  },
  {
    datasetName: 'KAG_conversion_data',
    datasetDescription: 'KAG_conversion_data dataset description',
    firebaseDatasetID: 'm7LxNH7cOHwHZG0yei7I',
    firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
    columnAnnotationData: [
      // ad_id
      {
        columnName: 'ad_id',
        annotationId: 'a1d2_i3d4e5n6t7i8f9i0e1r2', // Ad Identifier
      },
      // xyz_campaign_id
      {
        columnName: 'xyz_campaign_id',
        annotationId: 'x1y2z3C4a5m6p7a8i9g0n1I2D3', // XYZ Campaign Identifier
      },
      // fb_campaign_id
      {
        columnName: 'fb_campaign_id',
        annotationId: 'f1b2C3a4m5p6a7i8g9n0I1D2', // Facebook Campaign Identifier
      },
      // age
      {
        columnName: 'age',
        annotationId: 'a4g5e6_r7a8n9g0e1', // Age Range
      },
      {
        columnName: 'age',
        annotationId: 'y1e2a3r4s5', // Years
      },
      // gender
      {
        columnName: 'gender',
        annotationId: 'g1e2n3d4e5r6_f7l8a9g0', // Gender
      },
      // interest
      // Impressions
      {
        columnName: 'Impressions',
        annotationId: 'i1m2p3r4e5s6s7i8o9n0s1', // Impressions
      },
      {
        columnName: 'Impressions',
        annotationId: 'k1l2m3n4o5-p6q7r8s9t0u1asdasd', // Visibility Metric
      },
      // Clicks
      {
        columnName: 'Clicks',
        annotationId: 'c1l2i3c4k5s6-w7h8a9t0a1c2l3i4c5k6', // Click Definition
      },

      // Spent
      {
        columnName: 'Spent',
        annotationId: 's1p2e3n4t5-c6o7l8u9m0n1', // Expenditure Indicator
      },
      {
        columnName: 'Spent',
        annotationId: 'c1o2s3t4-_e5f6f7i8c9i0e1n2c3y4', // Cost-Efficiency
      },
      // Total_Conversion
      {
        columnName: 'Total_Conversion',
        annotationId: 'c1o2s3t4-_e5f6f7i8c9i0e1n2c3y4', // Cost-Efficiency
      },
      {
        columnName: 'Total_Conversion',
        annotationId: 'c1o2n3v4e5r6s7i8o9n0_r1a2t3e4', // Conversion Rate
      },
      // Approved_Conversion
      {
        columnName: 'Approved_Conversion',
        annotationId: 'a1p2p3r4o5v6e7d8_c9o0n1v2e3r4s5i6o7n8', // Conversion Approval Metric
      },
      {
        columnName: 'Approved_Conversion',
        annotationId: 'c1o2s3t4-_e5f6f7i8c9i0e1n2c3y4', // Cost-Efficiency
      },
      {
        columnName: 'Approved_Conversion',
        annotationId: 'c1o2n3v4e5r6s7i8o9n0_r1a2t3e4', // Conversion Rate
      },
    ],
    annotationData: [
      // ad_id
      {
        id: 'a1d2_i3d4e5n6t7i8f9i0e1r2',
        createdAt: new Date('2023-01-07T10:00:00.123Z').toISOString(),
        description:
          'Ad Identifier: Ad ID is a unique identifier assigned to individual advertisements in the marketing campaign. It facilitates tracking, analysis, and management of ad performance.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Ad Identifier',
        shortcut: 'ad_identifier',
      },
      // xyz_campaign_id
      {
        id: 'x1y2z3C4a5m6p7a8i9g0n1I2D3',
        createdAt: new Date('2023-01-07T10:00:00.123Z').toISOString(),
        description:
          'XYZ Campaign Identifier: XYZ Campaign ID serves as a unique identifier for advertisements associated with the XYZ campaign. It facilitates tracking, analysis, and management of ads within this specific marketing initiative.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'XYZ Campaign Identifier',
        shortcut: 'xyz_campaign_identifier',
      },
      // fb_campaign_id
      {
        id: 'f1b2C3a4m5p6a7i8g9n0I1D2',
        createdAt: new Date('2023-03-07T10:00:00.123Z').toISOString(),
        description:
          'Facebook Campaign Identifier: Facebook Campaign ID serves as a unique identifier for advertisements associated with a specific Facebook campaign. It plays a crucial role in tracking, analyzing, and managing ads within the Facebook platform.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Facebook Campaign Identifier',
        shortcut: 'fb_campaign_identifier',
      },
      // age
      {
        id: 'a4g5e6_r7a8n9g0e1',
        createdAt: new Date('2023-04-07T10:00:00.123Z').toISOString(),
        description:
          'An age range is a segment of the population grouped based on a specified span of ages. It allows for tailored marketing strategies within the categorized age group.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Age Range',
        shortcut: 'age_range',
      },
      {
        id: 'y1e2a3r4s5',
        createdAt: new Date('2023-05-07T10:00:00.123Z').toISOString(),
        description:
          'A unit of time used to measure the duration of time, often expressed in the context of age or other temporal aspects. In demographic data, years can represent age groups or the timeframe for specific events.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Years',
        shortcut: 'years',
      },
      // gender
      {
        id: 'g1e2n3d4e5r6_f7l8a9g0',
        createdAt: new Date('2023-06-07T10:00:00.123Z').toISOString(),
        description:
          'Indicates the gender of individuals, using "M" for Male and "F" for Female. This information is essential for demographic targeting and audience segmentation based on gender.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Gender',
        shortcut: 'gender',
      },
      // interest

      // Impressions
      {
        id: 'i1m2p3r4e5s6s7i8o9n0s1',
        createdAt: new Date('2023-08-07T10:00:00.123Z').toISOString(),
        description:
          'Impressions: The total number of times an ad or content is displayed to individuals within the target audience. It measures the reach and exposure of the marketing campaign, indicating how frequently the content is viewed by potential customers.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Impressions',
        shortcut: 'impressions',
      },
      {
        id: 'k1l2m3n4o5-p6q7r8s9t0u1asdasd',
        createdAt: new Date('2023-09-07T10:00:00.123Z').toISOString(),
        description:
          "Visibility Metric: 'Impressions' measures how often an ad is displayed to users, providing crucial insights into potential reach and exposure. It's foundational for understanding ad impact and analyzing campaign performance.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Visibility Metric',
        shortcut: 'visibility_metric',
      },
      // Clicks
      {
        id: 'c1l2i3c4k5s6-w7h8a9t0a1c2l3i4c5k6',
        createdAt: new Date('2023-10-07T10:00:00.123Z').toISOString(),
        description:
          "In digital advertising, a 'click' is a user's interaction with an ad. 'Clicks' represent the total number of user selections on an ad, signifying engagement and interest.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Click',
        shortcut: 'click',
      },
      // Spent
      {
        id: 's1p2e3n4t5-c6o7l8u9m0n1',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          "Expenditure Indicator reflects the total financial investment in an advertising campaign, covering costs for placements and promotions. This metric is crucial for budget assessment, cost-effectiveness, and optimizing future strategies. A higher 'Spent' value may indicate a more significant investment, influencing return on investment (ROI) analysis.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Expenditure Indicator',
        shortcut: 'expenditure_indicator',
      },

      // Total_Conversion
      // Approved_Conversion
      {
        id: 'a1p2p3r4o5v6e7d8_c9o0n1v2e3r4s5i6o7n8',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          "Conversion Approval Metric quantifies successful user actions in an advertising campaign, reflecting achieved conversions such as sign-ups or purchases. It's a crucial indicator of campaign effectiveness, guiding advertisers to assess strategy success and refine approaches for enhanced conversion rates.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Conversion Approval Metric',
        shortcut: 'conversion_approval_metric',
      },
      // others
      {
        id: 'd1e2m3o4g5r6a7p8h9i0c1s2',
        createdAt: new Date('2023-07-07T10:00:00.123Z').toISOString(),
        description:
          'Demographics: The study of statistical data related to human populations, focusing on characteristics such as age, gender, and other factors. In the context of marketing, demographics provide insights into the composition of the target audience.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Demographics',
        shortcut: 'demographics',
      },
      {
        id: 'r1o2i3_c4a5l6c7u8l9a0t1i2o3n4',
        createdAt: new Date('2023-07-07T10:00:00.123Z').toISOString(),
        description:
          "Return on Investment (ROI): A financial metric comparing advertising campaign gains to costs. The formula is the ratio of the difference between successful conversions ('Approved_Conversion' multiplied by 'Value_Per_Conversion') and the total campaign investment ('Spent') to 'Spent,' multiplied by 100. A positive ROI indicates profitability, while a negative ROI suggests potential optimization needs.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Return on Investment (ROI)',
        shortcut: 'roi',
      },
      {
        id: 'e1n2g3a4g5e6m7e8n9t0_r1a2t3e4',
        createdAt: new Date('2023-07-07T10:00:00.123Z').toISOString(),
        description:
          "Engagement Rate: A metric combining 'Impressions' and 'Clicks' in an advertising campaign, calculated as the ratio of 'Clicks' to 'Impressions.' It gauges how effectively ads capture attention and encourage user interaction. A higher 'Engagement Rate' signifies greater audience interaction and interest. Advertisers use this metric to assess ad content effectiveness and optimize campaigns for improved interaction.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Engagement Rate',
        shortcut: 'engagement_rate',
      },
      {
        id: 'm1a2r3k4e5t6i7n8g9_m1e2t3r4i5c6',
        createdAt: new Date('2023-07-07T10:00:00.123Z').toISOString(),
        description:
          "Marketing Metrics: A diverse set of measurements assessing the effectiveness of marketing strategies. These metrics provide insights into audience engagement, campaign performance, and overall impact on business objectives. Examples include 'Engagement Rate,' 'Click-Through Rate (CTR),' 'Conversion Rate,' and 'Impressions.' Advertisers leverage these metrics for data-driven decisions, campaign optimization, and alignment with organizational goals.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Marketing Metrics',
        shortcut: 'marketing_metrics',
      },
      {
        id: 'c1o2s3t4-_e5f6f7i8c9i0e1n2c3y4',
        createdAt: new Date('2023-07-07T10:00:00.123Z').toISOString(),
        description:
          "Cost-Efficiency Metric: Analyzing 'Spent,' 'Total_Conversion,' and 'Approved_Conversion' in an advertising campaign to evaluate budget effectiveness in achieving conversions. Advertisers use this metric for overall campaign assessment and resource optimization. A higher 'Cost-Efficiency' indicates effective budget utilization for approved conversions, while a lower efficiency suggests areas for improvement.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Cost-Efficiency',
        shortcut: 'cost_efficiency',
      },
      {
        id: 'c1o2n3v4e5r6s7i8o9n0_r1a2t3e4',
        createdAt: new Date('2023-07-07T10:00:00.123Z').toISOString(),
        description:
          "Conversion Rate: Calculated by dividing 'Approved_Conversion' by 'Total_Conversion' in an advertising campaign, it gauges how effectively the campaign transforms potential interest into actual conversions. A higher 'Conversion Rate' signifies successful achievement of desired user actions, enabling optimization for increased conversion success.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Conversion Rate',
        shortcut: 'conversion_rate',
      },

      {
        id: 'c3d4e5f6-g7h8-i9j0k1l2m3n4dasadsdas',
        createdAt: new Date('2023-11-07T10:00:00.123Z').toISOString(),
        description:
          'A metric is a quantifiable measure used for assessing, comparing, and tracking performance.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Metric',
        shortcut: 'metric',
      },
    ],
    relatedAnnotations: [
      // Gender
      {
        sourceId: 'g1e2n3d4e5r6_f7l8a9g0', // Gender
        targetId: 'd1e2m3o4g5r6a7p8h9i0c1s2', // Demographics
      },
      // Age
      {
        sourceId: 'a4g5e6_r7a8n9g0e1', // Age Range
        targetId: 'd1e2m3o4g5r6a7p8h9i0c1s2', // Demographics
      },
      // Impressions
      {
        sourceId: 'k1l2m3n4o5-p6q7r8s9t0u1asdasd', // Visibility Metric
        targetId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4dasadsdas', // Metric
      },
      // Clicks
      // Approved_Conversion
      {
        sourceId: 'a1p2p3r4o5v6e7d8_c9o0n1v2e3r4s5i6o7n8', // Engagement Metric
        targetId: 'r1o2i3_c4a5l6c7u8l9a0t1i2o3n4', // Return on Investment (ROI)
      },
      // Spent
      {
        sourceId: 's1p2e3n4t5-c6o7l8u9m0n1', // Expenditure Indicator
        targetId: 'r1o2i3_c4a5l6c7u8l9a0t1i2o3n4', // Return on Investment (ROI)
      },
      {
        sourceId: 'r1o2i3_c4a5l6c7u8l9a0t1i2o3n4', // Return on Investment (ROI)
        targetId: 'b2c3d4e5-f6g7-h8i9-j0k1l2m3n4c', // Financial metric
      },
      // others
      {
        sourceId: 'e1n2g3a4g5e6m7e8n9t0_r1a2t3e4', // Engagement Rate
        targetId: 'm1a2r3k4e5t6i7n8g9_m1e2t3r4i5c6', // Marketing Metrics
      },
      {
        sourceId: 'm1a2r3k4e5t6i7n8g9_m1e2t3r4i5c6', // Marketing Metrics
        targetId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4dasadsdas', // Metric
      },
      {
        sourceId: 'c1o2s3t4-_e5f6f7i8c9i0e1n2c3y4', // Cost-Efficiency
        targetId: 'b2c3d4e5-f6g7-h8i9-j0k1l2m3n4c', // Financial metric
      },
      {
        sourceId: 'c1o2n3v4e5r6s7i8o9n0_r1a2t3e4', // Conversion Rate
        targetId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4dasadsdas', // Metric
      },

      {
        sourceId: 'i1m2p3r4e5s6s7i8o9n0s1', // Conversion Rate
        targetId: 'e1n2g3a4g5e6m7e8n9t0_r1a2t3e4', // Engagement Rate
      },

      {
        sourceId: 'c1l2i3c4k5s6-w7h8a9t0a1c2l3i4c5k6', // Click
        targetId: 'e1n2g3a4g5e6m7e8n9t0_r1a2t3e4', // Engagement Rate
      },
    ],
    columnData: [
      {
        columnName: 'ad_id',
        columnDescription:
          'Ad ID: A unique identifier for each advertisement in the marketing campaign.',
      },
      {
        columnName: 'xyz_campaign_id',
        columnDescription:
          'XYZ Campaign ID: An identifier for the XYZ campaign to which the advertisement belongs.',
      },
      {
        columnName: 'fb_campaign_id',
        columnDescription:
          'Facebook Campaign ID: An identifier for the Facebook campaign associated with the advertisement.',
      },
      {
        columnName: 'age',
        columnDescription:
          'Age: The age group or range of the target audience for the advertisement.',
      },
      {
        columnName: 'gender',
        columnDescription:
          'Gender: The gender category of the target audience for the advertisement.',
      },
      {
        columnName: 'interest',
        columnDescription:
          'Interest: The specific area of interest or topic targeting the advertisement.',
      },
      {
        columnName: 'Impressions',
        columnDescription:
          'Impressions: The number of times the advertisement was viewed or displayed.',
      },
      {
        columnName: 'Clicks',
        columnDescription:
          'Clicks: The number of clicks received on the advertisement, indicating user interaction.',
      },
      {
        columnName: 'Spent',
        columnDescription:
          'Spent: The amount of money spent on the advertisement campaign.',
      },
      {
        columnName: 'Total_Conversion',
        columnDescription:
          'Total Conversion: The total number of conversions attributed to the advertisement, including approved and unapproved conversions.',
      },
      {
        columnName: 'Approved_Conversion',
        columnDescription:
          'Approved Conversion: The number of conversions that have been approved and validated.',
      },
    ],
  },
  {
    datasetName: 'Ecommerce Customers',
    datasetDescription: 'Ecommerce Customers dataset description',
    firebaseDatasetID: 'i11dedyswB5bQ7RVTkD0',
    firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
    columnAnnotationData: [
      // Email
      {
        columnName: 'Email',
        annotationId: 'a1d2_i3d4e5n6t7i8f9i0e1r2asdasdwerwrt', // Email
      },

      // Address
      {
        columnName: 'Address',
        annotationId: 'a1d2_i3d4e5n6asdasdasdt7i8f9i0e1r2', // Address
      },
      // Avatar
      {
        columnName: 'Avatar',
        annotationId: 'a1v2a3t4a5r6_a7v8a9t0a1r2', // Avatar
      },
      // Avg. Session Length
      {
        columnName: 'Avg. Session Length',
        annotationId: 's1e2s3s4i5o6n7_l8e9n0g1t2h3', // Session Length
      },
      // Time on App
      {
        columnName: 'Time on App',
        annotationId: 't1i2m3e4_o5n6_a7p8p9', // Time on App
      },
      // Time on Website
      {
        columnName: 'Time on Website',
        annotationId: 't1i2m3e4_o5n6_w7e8b9s0i1t2e3', // Time on Website
      },
      // Length of Membership
      {
        columnName: 'Length of Membership',
        annotationId: 'l1e2n3g4t5h6_o7f8_m9e0m1b2e3r4s5h6i7p8', // Length of Membership
      },
      // Yearly Amount Spent
      {
        columnName: 'Yearly Amount Spent',
        annotationId: 'y1e2a3r4l5y6_a7m8o9u0n1t2_sp3e4n5t6', // Yearly Amount Spent
      },
      {
        columnName: 'Yearly Amount Spent',
        annotationId: 'tasd1i2m3e4_o5n6_w7easdasd8b9s0i1t2e3', // Revenue Generation Metrics
      },
    ],
    annotationData: [
      // Email

      {
        id: 'a1d2_i3d4e5n6t7i8f9i0e1r2asdasdwerwrt',
        createdAt: new Date('2023-01-07T10:00:00.123Z').toISOString(),
        description:
          'Email: Contains the unique email addresses of users. It serves as a primary identifier and communication channel within the system, crucial for user-specific interactions, account verification, and communication purposes.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Email',
        shortcut: 'email',
      },
      // Address
      {
        id: 'a1d2_i3d4e5n6asdasdasdt7i8f9i0e1r2',
        createdAt: new Date('2023-01-07T10:00:00.123Z').toISOString(),
        description:
          'Address: Represents the physical address associated with user accounts. It serves as a location identifier and is essential for user-specific interactions, account verification, and communication within the system.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Address',
        shortcut: 'address',
      },
      // Avatar
      {
        id: 'a1v2a3t4a5r6_a7v8a9t0a1r2',
        createdAt: new Date('2023-01-07T10:00:00.123Z').toISOString(),
        description:
          'Avatar: Represents visual profile images associated with users within the system. While not a direct identifier, avatars contribute to personalization and recognition, enhancing the user experience.',
        shortcut: 'avatar',
        name: 'Avatar',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
      },
      // Avg. Session Length
      {
        id: 's1e2s3s4i5o6n7_l8e9n0g1t2h3',
        createdAt: new Date('2023-03-07T10:00:00.123Z').toISOString(),
        description:
          'The duration of time a user actively interacts with a system or application during a single session. It measures the engagement and usability of the platform, reflecting how long users typically remain involved and engaged in their activities.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Session Length',
        shortcut: 'session_length',
      },
      // Time on App
      {
        id: 't1i2m3e4_o5n6_a7p8p9',
        createdAt: new Date('2023-04-07T10:00:00.123Z').toISOString(),
        description:
          "Time on App: The total amount of time users spend actively engaging with a mobile application. This metric measures the user's investment of time and attention on the app, providing insights into user engagement, satisfaction, and the overall appeal of the mobile experience.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Time on App',
        shortcut: 'time_on_app',
      },
      // Time on Website
      {
        id: 't1i2m3e4_o5n6_w7e8b9s0i1t2e3',
        createdAt: new Date('2023-05-07T10:00:00.123Z').toISOString(),
        description:
          "Time on Website: The total amount of time users spend actively engaging with a website. This metric measures the user's investment of time and attention on the website, providing insights into user engagement, satisfaction, and the overall appeal of the online experience.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Time on Website',
        shortcut: 'time_on_website',
      },
      // Length of Membership
      {
        id: 'l1e2n3g4t5h6_o7f8_m9e0m1b2e3r4s5h6i7p8',
        createdAt: new Date('2023-06-07T10:00:00.123Z').toISOString(),
        description:
          'Length of Membership: The duration of time a user has been a member or subscriber to a service or platform. This metric reflects user loyalty and long-term commitment, providing insights into the retention and satisfaction levels of the user base.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Length of Membership',
        shortcut: 'membership_length',
      },
      // Yearly Amount Spent

      {
        id: 'y1e2a3r4l5y6_a7m8o9u0n1t2_sp3e4n5t6',
        createdAt: new Date('2023-07-07T10:00:00.123Z').toISOString(),
        description:
          "Yearly Amount Spent: The total monetary expenditure by a user within a year on a service, product, or platform. This metric measures the user's financial investment, providing insights into spending patterns, customer value, and the overall economic contribution of individual users.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Yearly Amount Spent',
        shortcut: 'yearly_spending',
      },

      {
        id: 'tasd1i2m3e4_o5n6_w7easdasd8b9s0i1t2e3',
        createdAt: new Date('2023-07-07T10:00:00.123Z').toISOString(),
        description:
          'Serves as a key metric for revenue generation. Analyzing this, along with other metrics, can help identify high-value customers and optimize strategies to increase spending.',
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Revenue Generation Metrics',
        shortcut: 'revenue_metrics',
      },

      // others
      {
        id: 'u1s2e3r4_p5r6o7f8i9l0e1',
        createdAt: new Date('2023-08-07T10:00:00.123Z').toISOString(),
        description:
          "User Profile: A representation of an individual user within a system, created by combining information from various columns. The 'Email' serves as a unique identifier and communication channel. 'Address' provides the physical location associated with the user. 'Avatar' is a visual representation or profile image enhancing personalization and recognition.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'User Profile',
        shortcut: 'user_profile',
      },
      {
        id: 'y1e2a3r4ldy6_a7asdm8u0nasd1t2_sp34n5t6',
        createdAt: new Date('2023-08-07T10:00:00.123Z').toISOString(),
        description:
          "Engagement Metrics: Provide insights into user interaction, including 'Avg. Session Length,' 'Time on App,' and 'Time on Website.' These metrics help gauge user activity and engagement with the app and website.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Engagement Metrics',
        shortcut: 'engagement_metrics',
      },

      {
        id: 'y1e2asdar4y6_aasdmunasd1t2_s34n5t6',
        createdAt: new Date('2023-08-07T10:00:00.123Z').toISOString(),
        description:
          "Membership Dynamics Metrics: 'Length of Membership' and 'Yearly Amount Spent' can be used to analyze the relationship between user loyalty and spending. Longer membership durations may correlate with higher yearly spending, indicating a strong customer relationship.",
        firebaseUserUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
        name: 'Membership Dynamics Metrics',
        shortcut: 'membership_metrics',
      },
    ],
    relatedAnnotations: [
      // Email
      {
        sourceId: 'a1d2_i3d4e5n6t7i8f9i0e1r2asdasdwerwrt', // Email
        targetId: 'u1s2e3r4_p5r6o7f8i9l0e1', // User Profile
      },
      // Address
      {
        sourceId: 'a1d2_i3d4e5n6asdasdasdt7i8f9i0e1r2', // Address
        targetId: 'u1s2e3r4_p5r6o7f8i9l0e1', // User Profile
      },
      // Avatar
      {
        sourceId: 'a1v2a3t4a5r6_a7v8a9t0a1r2', // Avatar
        targetId: 'u1s2e3r4_p5r6o7f8i9l0e1', // User Profile
      },

      // Avg. Session Length
      {
        sourceId: 's1e2s3s4i5o6n7_l8e9n0g1t2h3', // Session Length
        targetId: 'y1e2a3r4ldy6_a7asdm8u0nasd1t2_sp34n5t6', // Engagement Metrics
      },
      // Time on App
      {
        sourceId: 't1i2m3e4_o5n6_a7p8p9', // Time on App
        targetId: 'y1e2a3r4ldy6_a7asdm8u0nasd1t2_sp34n5t6', // Engagement Metrics
      },
      // Time on Website
      {
        sourceId: 't1i2m3e4_o5n6_w7e8b9s0i1t2e3', // Time on Website
        targetId: 'y1e2a3r4ldy6_a7asdm8u0nasd1t2_sp34n5t6', // Engagement Metrics
      },
      // Yearly Amount Spent
      {
        sourceId: 'tasd1i2m3e4_o5n6_w7easdasd8b9s0i1t2e3', // Revenue Generation Metrics
        targetId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4dasadsdas', // Metric
      },
      {
        sourceId: 'y1e2a3r4l5y6_a7m8o9u0n1t2_sp3e4n5t6', // 	Yearly Amount Spent
        targetId: 'y1e2asdar4y6_aasdmunasd1t2_s34n5t6', // Membership Dynamics Metrics
      },

      // Length of Membership
      {
        sourceId: 'l1e2n3g4t5h6_o7f8_m9e0m1b2e3r4s5h6i7p8', // Length of Membership
        targetId: 'y1e2asdar4y6_aasdmunasd1t2_s34n5t6', // Membership Dynamics Metrics
      },
      // Others
      {
        sourceId: 'y1e2a3r4ldy6_a7asdm8u0nasd1t2_sp34n5t6', // Engagement Metrics
        targetId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4dasadsdas', // Metric
      },
      {
        sourceId: 'y1e2asdar4y6_aasdmunasd1t2_s34n5t6', //	Membership Dynamics Metrics
        targetId: 'c3d4e5f6-g7h8-i9j0k1l2m3n4dasadsdas', // Metric
      },
    ],
    columnData: [
      {
        columnName: 'Email',
        columnDescription:
          'Email: The email address of the user, serving as a unique identifier and means of communication.',
      },

      {
        columnName: 'Address',
        columnDescription:
          "Address: The physical address associated with the user's account, providing location information.",
      },

      {
        columnName: 'Avatar',
        columnDescription:
          "Avatar: Represents the user's profile image or visual representation within the system.",
      },

      {
        columnName: 'Avg. Session Length',
        columnDescription:
          'Avg. Session Length: The average duration of user sessions on the application or website.',
      },

      {
        columnName: 'Time on App',
        columnDescription:
          'Time on App: The total time users spend actively engaged with the mobile application.',
      },

      {
        columnName: 'Time on Website',
        columnDescription:
          'Time on Website: The total time users spend actively engaged with the website.',
      },

      {
        columnName: 'Length of Membership',
        columnDescription:
          'Length of Membership: The duration for which a user has been a member or subscriber.',
      },

      {
        columnName: 'Yearly Amount Spent',
        columnDescription:
          'Yearly Amount Spent: The total expenditure by the user on the platform over the course of a year.',
      },
    ],
  },
];

@Injectable()
export class SeedNeo4jService {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createAnnotation() {
    // dataset part
    // Check if the dataset already exists
    for (const dataset of datasets) {
      const existingDataset = await this.queryRepository
        .initQuery()
        .match([
          node('dataset:Dataset', 'Dataset', {
            datasetName: dataset.datasetName,
          }),
        ])
        .return('dataset')
        .limit(1)
        .run();

      if (existingDataset.length === 0) {
        // Create the Dataset node if it doesn't exist

        const createDataset = await this.queryRepository
          .initQuery()
          .createNode('Dataset', 'Dataset', {
            datasetName: dataset.datasetName,
            datasetDescription: dataset.datasetDescription,
            firebaseDatasetID: dataset.firebaseDatasetID,
            firebaseUserUID: dataset.firebaseUserUID,
          })
          .return('Dataset')
          .run();
        console.log('createDataset', createDataset);
      }
      // annotations part

      // column part
      for (const column of dataset.columnData) {
        // Check if the Column node already exists
        const existingColumn = await this.queryRepository
          .initQuery()
          .match([
            node('column:Column', 'Column', {
              columnName: column.columnName,
            }),
          ])
          .return('column')
          .limit(1)
          .run();

        if (existingColumn.length === 0) {
          // Create the Column node if it doesn't exist
          const createColumn = await this.queryRepository
            .initQuery()
            .createNode('Column', 'Column', column)
            .return('Column')
            .run();
          console.log('createColumn', createColumn);

          // Create the "HAS_COLUMN" relationship
          await this.queryRepository
            .initQuery()
            .match([
              node('dataset:Dataset', 'Dataset', {
                datasetName: dataset.datasetName,
              }),
            ])
            .match([
              node('column:Column', 'Column', {
                columnName: column.columnName, // Filter by the columnName property
              }),
            ])
            .create([
              node('dataset'),
              relation('out', 'rel', 'HAS_COLUMN'),
              node('column'),
            ])
            .run();
        }
      }

      // annotation part
      for (const annotation of dataset.annotationData) {
        // Check if the annotation already exists
        const existingAnnotation = await this.queryRepository
          .initQuery()
          .match([
            node('annotation:Annotation', 'Annotation', {
              id: annotation.id,
            }),
          ])
          .return('annotation')
          .first();

        if (existingAnnotation) {
        } else {
          // Create the annotation
          const createAnnotation = await this.queryRepository
            .initQuery()
            .createNode('Annotation', 'Annotation', annotation)
            .return('Annotation')
            .run();

          console.log('createAnnotation', createAnnotation);
        }
      }
      // Create RELATED_TO relationships forming a chain
      for (const relationship of dataset.relatedAnnotations) {
        const sourceId = relationship.sourceId;
        const targetId = relationship.targetId;

        // Check if the relationship already exists
        const checkRelationshipQuery = await this.queryRepository
          .initQuery()
          .match([
            node('source:Annotation', 'Annotation', { id: sourceId }),
            relation('out', 'RELATED_TO', 'RELATED_TO'),
            node('target:Annotation', 'Annotation', { id: targetId }),
          ])
          .return(['source, target'])
          .run();
        if (checkRelationshipQuery.length === 0) {
          // Relationship doesn't exist, so create it
          await this.queryRepository
            .initQuery()
            .match([node('source:Annotation', 'Annotation', { id: sourceId })])
            .match([node('target:Annotation', 'Annotation', { id: targetId })])
            .create([
              node('source'),
              relation('out', 'RELATED_TO', 'RELATED_TO'),
              node('target'),
            ])
            .return(['source, target'])
            .run();
          console.log(
            `Created RELATED_TO relationship between ${sourceId} and ${targetId}:`,
          );
        }
      }

      // Loop through the columnAnnotationData array and create relationships
      for (const { columnName, annotationId } of dataset.columnAnnotationData) {
        // Check if the relationship already exists
        const existingRelationship = await this.queryRepository
          .initQuery()
          .match([
            node('column:Column', 'Column', { columnName }),
            relation('out', 'is_ANNOTATED', 'ANNOTATED_WITH'),
            node('annotation:Annotation', 'Annotation', { id: annotationId }),
          ])
          .return(['column', 'annotation'])
          .run();

        if (existingRelationship.length === 0) {
          // Relationship doesn't exist, so create it
          await this.queryRepository
            .initQuery()
            .match([
              node('column:Column', 'Column', {
                columnName: columnName,
              }),
            ])
            .match([
              node('annotation:Annotation', 'Annotation', {
                id: annotationId,
              }),
            ])
            .create([
              node('column'),
              relation('out', '', 'ANNOTATED_WITH'),
              node('annotation'),
            ])
            .run();

          console.log(
            `Created ANNOTATED_WITH relationship between column '${columnName}' and annotation '${annotationId}'`,
          );
        }
      }
    }
  }
}
