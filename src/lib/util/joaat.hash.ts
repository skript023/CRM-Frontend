function convertToUnsigned(value: number)
{
    return (value >>> 0);
}

function joaat(key: string)
{
    var keyLowered = key.toLowerCase();
    var length = keyLowered.length;
    var hash, i;

    for (hash = i = 0; i < length; i++){
        hash += keyLowered.charCodeAt(i);
        hash += (hash << 10);
        hash ^= (hash >>> 6);
    }

    hash += (hash << 3);
    hash ^= (hash >>> 11);
    hash += (hash << 15);

    return convertToUnsigned(hash);
}

export default joaat;