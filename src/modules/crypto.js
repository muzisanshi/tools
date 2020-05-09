/**
 * hash和aes加密解密工具
 */

const crypto = require('crypto');

// 返回16进制字符串
const hashEncrypt = (algo,data) => {
	let crypted = crypto.createHash(algo);
	return crypted.update(data).digest('hex');
}

// 返回16进制字符串
const aesEncrypt = (algo,data,key,iv) => {
	const cipher = crypto.createCipheriv(algo,key,iv);
	let crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

// 返回普通字符串
const aesDecrypt = (algo,data,key,iv) => {
	const decipher = crypto.createDecipheriv(algo,key,iv);
	let decrypted = decipher.update(data, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

// 返回16进制的md5密文
const md5 = (data) => {
	return hashEncrypt('md5',data);
}

// 返回16进制的sha1密文
const sha1 = (data) => {
	return hashEncrypt('sha1',data);
}

// 返回16进制的sha224密文
const sha224 = (data) => {
	return hashEncrypt('sha224',data);
}

// 返回16进制的sha256密文
const sha256 = (data) => {
	return hashEncrypt('sha256',data);
}

// 返回16进制的sha384密文
const sha384 = (data) => {
	return hashEncrypt('sha384',data);
}

// 返回16进制的sha512密文
const sha512 = (data) => {
	return hashEncrypt('sha512',data);
}

/**
 * aes加密统一使用CBC模式
 */
// 返回16进制的aes128对称加密密文
const aes128Encrypt = (data,key,iv) => {
	return aesEncrypt("aes-128-cbc",data,key,iv);
}

// 返回aes128对称加密的明文
const aes128Decrypt = (data,key,iv) => {
	return aesDecrypt("aes-128-cbc",data,key,iv);
}

// 返回16进制的aes192对称加密密文
const aes192Encrypt = (data,key,iv) => {
	return aesEncrypt("aes-192-cbc",data,key,iv);
}

// 返回aes192对称加密的明文
const aes192Decrypt = (data,key,iv) => {
	return aesDecrypt("aes-192-cbc",data,key,iv);
}

// 返回16进制的aes256对称加密密文
const aes256Encrypt = (data,key,iv) => {
	return aesEncrypt("aes-256-cbc",data,key,iv);
}

// 返回aes256对称加密的明文
const aes256Decrypt = (data,key,iv) => {
	return aesDecrypt("aes-256-cbc",data,key,iv);
}

module.exports = {
	hashEncrypt,
	aesEncrypt,
	aesDecrypt,
	
	md5,
	sha1,
	sha224,
	sha256,
	sha384,
	sha512,
	
	aes128Encrypt,
	aes128Decrypt,
	aes192Encrypt,
	aes192Decrypt,
	aes256Encrypt,
	aes256Decrypt,
}
