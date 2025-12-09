# Fly.io Monitoring Setup Guide

This guide explains how to set up comprehensive monitoring for your NextNode Frontend application on Fly.io.

## Overview

The monitoring stack includes:

- **Fly.io Metrics**: Built-in Prometheus metrics
- **Custom Application Metrics**: Business logic and performance metrics
- **Grafana Dashboards**: Visual monitoring and alerting
- **Health Checks**: Application health endpoints

## 1. Fly.io Built-in Monitoring

Fly.io automatically provides:

- Infrastructure metrics (CPU, Memory, Network, Disk)
- HTTP request metrics
- Machine health and status
- Deployment metrics

### Accessing Fly.io Metrics

1. **Grafana Dashboard**: Visit [fly-metrics.net](https://fly-metrics.net)
2. **Prometheus API**: Access via `https://api.fly.io/prometheus/$(your-org)`
3. **CLI Metrics**: `flyctl metrics --app your-app-name`

### Required Authentication

```bash
# Get your auth token
flyctl auth token

# Use in HTTP requests
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.fly.io/prometheus/your-org/api/v1/query?query=up
```

## 2. Custom Application Metrics

### Available Endpoints

- `/health` - Application health check
- `/metrics` - Prometheus-formatted custom metrics

### Custom Metrics Collected

- `app_page_views_total` - Total page views
- `app_response_time_seconds` - Response time histogram
- `app_errors_total` - Error count by type and path
- `app_memory_*` - Memory usage metrics
- `app_feature_usage` - Feature usage tracking
- `nodejs_*` - Node.js process metrics

### Using Metrics in Your Code

```typescript
import { ApplicationMetrics } from '../lib/metrics'

// Track page views
ApplicationMetrics.recordPageView('/dashboard')

// Track feature usage
ApplicationMetrics.recordFeatureUsage('start_project_modal')

// Track errors
ApplicationMetrics.recordError('validation_error', '/contact')

// Track API calls
ApplicationMetrics.recordApiCall('/api/users', 'GET', 200, 150)
```

## 3. Grafana Dashboard Setup

### Import Dashboard

1. Access [fly-metrics.net](https://fly-metrics.net)
2. Login with your Fly.io credentials
3. Go to **Dashboards** → **Import**
4. Upload `monitoring/grafana-dashboard.json`
5. Configure data source (should auto-detect Fly.io Prometheus)

### Dashboard Features

- **Application Overview**: Key metrics at a glance
- **Response Time**: Average response time with alerting
- **Error Rate**: Error tracking over time
- **Memory Usage**: Node.js memory consumption
- **Page Views**: Traffic by route
- **System Metrics**: Uptime and build information

## 4. Alerting Setup

### Response Time Alert

Triggers when average response time > 2 seconds for 5 minutes:

```promql
rate(app_response_time_seconds_sum[5m]) / rate(app_response_time_seconds_count[5m]) > 2
```

### Memory Usage Alert

Triggers when heap usage > 90%:

```promql
(nodejs_memory_heap_used_bytes / nodejs_memory_heap_total_bytes) * 100 > 90
```

### Error Rate Alert

Triggers when error rate > 5 errors/minute:

```promql
rate(app_errors_total[1m]) * 60 > 5
```

## 5. Log Aggregation

### Accessing Logs

```bash
# Real-time logs
flyctl logs --app your-app-name

# Historical logs with filters
flyctl logs --app your-app-name --region cdg --since 1h
```

### Structured Logging

The application uses structured JSON logging:

```json
{
	"timestamp": "2025-01-23T10:30:00Z",
	"level": "info",
	"message": "Page view recorded",
	"path": "/dashboard",
	"user_agent": "Mozilla/5.0...",
	"response_time": 145
}
```

### Log Search in Grafana

1. Access **Explore** tab in Grafana
2. Select **Logs** data source
3. Use LogQL queries:

```logql
{app="nextnode-front-prod"} |= "error"
{app="nextnode-front-prod"} | json | response_time > 1000
```

## 6. Performance Monitoring

### Key Metrics to Monitor

1. **Response Time**: Target < 500ms average
2. **Error Rate**: Target < 1% of requests
3. **Memory Usage**: Target < 80% heap usage
4. **Page Load Time**: Target < 2 seconds
5. **Uptime**: Target > 99.9%

### Performance Optimization

Monitor these metrics to identify optimization opportunities:

- Slow endpoints via `app_response_time_seconds`
- Memory leaks via `nodejs_memory_*`
- Error patterns via `app_errors_by_type`
- Popular pages via `app_page_views_by_path`

## 7. Deployment Monitoring

### Deployment Health Checks

The GitHub Actions workflows include:

- Health checks after deployment
- Automatic rollback on failure
- Performance validation
- Certificate verification

### Monitoring Deployments

```bash
# Monitor deployment status
flyctl status --app your-app-name

# Check recent deployments
flyctl releases --app your-app-name

# Monitor during deployment
flyctl logs --app your-app-name -f
```

## 8. Regional Monitoring

### Multi-Region Setup

For global applications, monitor:

- Response times by region
- Regional error rates
- Traffic distribution
- Regional health status

### Regional Metrics

```promql
# Response time by region
avg by (region) (rate(app_response_time_seconds_sum[5m]) / rate(app_response_time_seconds_count[5m]))

# Error rate by region
sum by (region) (rate(app_errors_total[5m]))
```

## 9. Troubleshooting

### Common Issues

1. **Missing Metrics**: Check `/metrics` endpoint accessibility
2. **High Memory Usage**: Monitor `nodejs_memory_*` metrics
3. **Slow Responses**: Analyze `app_response_time_seconds`
4. **High Error Rates**: Check `app_errors_by_type`

### Debug Commands

```bash
# Check app health
curl https://your-app.fly.dev/health

# Check metrics endpoint
curl https://your-app.fly.dev/metrics

# Check Fly.io machine status
flyctl status --app your-app-name

# View detailed logs
flyctl logs --app your-app-name -f
```

## 10. Best Practices

1. **Monitor Key User Journeys**: Track critical paths through your app
2. **Set Meaningful Alerts**: Avoid alert fatigue with relevant thresholds
3. **Regular Review**: Weekly review of metrics and trends
4. **Capacity Planning**: Monitor growth trends for scaling decisions
5. **Security Monitoring**: Track unusual patterns and errors

## Resources

- [Fly.io Metrics Documentation](https://fly.io/docs/monitoring/metrics/)
- [Prometheus Query Language](https://prometheus.io/docs/prometheus/latest/querying/)
- [Grafana Dashboard Documentation](https://grafana.com/docs/grafana/latest/dashboards/)
- [Fly.io Status Page](https://status.flyio.net/)
