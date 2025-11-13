# DNS Configuration Guide for omardev.engineer

## Quick Setup

Log into your domain registrar (where you purchased omardev.engineer) and configure these DNS records:

## DNS Records to Add

### For Apex Domain (omardev.engineer)

**Type: A Records**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### For WWW Subdomain (www.omardev.engineer)

**Type: CNAME Record**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | omardev.engineer | 3600 |

## Step-by-Step Instructions

### Common Registrars:

**Namecheap:**
1. Log into Namecheap
2. Go to Domain List > Manage > Advanced DNS
3. Add the 4 A records
4. Add the CNAME record
5. Save changes

**GoDaddy:**
1. Log into GoDaddy
2. Go to My Products > DNS
3. Add records using the table above
4. Save

**Cloudflare:**
1. Log into Cloudflare
2. Select your domain
3. Go to DNS settings
4. Add records (disable proxy initially)
5. After GitHub Pages works, you can enable proxy

**Google Domains:**
1. Go to DNS settings
2. Add custom resource records
3. Add the A and CNAME records
4. Save

## Verification

After configuring DNS, verify with these commands:

```bash
# Check A records
dig omardev.engineer +short

# Should return the GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check CNAME for www
dig www.omardev.engineer +short
# Should return: omardev.engineer
```

Or use online tools:
- https://dnschecker.org
- https://mxtoolbox.com/DNSLookup.aspx

## Timeline

- DNS Propagation: 1-48 hours (usually <24 hours)
- GitHub Pages SSL: Up to 24 hours after DNS is configured
- Total Setup Time: Up to 48-72 hours for everything to work

## Troubleshooting

**DNS not resolving:**
- Wait longer (propagation can take time)
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Check with your registrar's support

**Still showing old site:**
- Clear browser cache
- Try incognito/private browsing
- Try different browser

**Certificate errors:**
- Wait for GitHub to provision SSL (up to 24 hours)
- Ensure "Enforce HTTPS" is enabled in GitHub repo settings

## After DNS is Configured

1. Go to GitHub repo settings: Settings > Pages
2. Enter custom domain: `omardev.engineer`
3. Save and wait for DNS check to pass
4. Enable "Enforce HTTPS" once DNS check passes
5. Deploy your site with `npm run deploy`
