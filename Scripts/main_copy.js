var myscada=require('./myscada');
myscada.init();

//Read tags for tag group OutPLS




setInterval(function() {  
    var t11,t5ii, t41;
    myscada.readTagsSymbolic("OutPLS", function (err,data){
  if (!err){
    var t2i=data['t2i'].value;
    var t2i_err=data['t2i'].err;
    var t3i=data['t3i'].value;
    var t3i_err=data['t3i'].err;
    var t4i=data['t4i'].value;
    var t4i_err=data['t4i'].err;
    var t5i=data['t5i'].value;
    var t5i_err=data['t5i'].err;
  }

    myscada.readTagsSymbolic("dataPLC", function (err,data){
        if (!err){
            var t1=data['t1'].value;
            var t1_err=data['t1'].err;
            var fanIn=data['fanIn'].value;
            var fanIn_err=data['fanIn'].err;
            var fanOut=data['fanOut'].value;
            var fanOut_err=data['fanOut'].err;
            var shimNKP=data['shimNKP'].value;
            var shimNKP_err=data['shimNKP'].err;
            var shimNKD=data['shimNKD'].value;
            var shimNKD_err=data['shimNKD'].err;
            var nkp=data['nkp'].value;
            var nkp_err=data['nkp'].err;
            var nkd=data['nkd'].value;
            var nkd_err=data['nkd'].err;
            var out1=data['out1'].value;
            var out1_err=data['out1'].err;
            var bp=data['bp'].value;
            var bp_err=data['bp'].err;
        }
//Read tags for tag group InParam
    myscada.readTagsSymbolic("InParam", function (err,data){
        if (!err){
            var m1rashod=data['m1rashod'].value;
            var m1rashod_err=data['m1rashod'].err;
            var m2rashod=data['m2rashod'].value;
            var m2rashod_err=data['m2rashod'].err;
            var kpdRecuper=data['kpdRecuper'].value;
            var kpdRecuper_err=data['kpdRecuper'].err;
            var q1=data['q1'].value;
            var q1_err=data['q1'].err;
            var q2=data['q2'].value;
            var q2_err=data['q2'].err;
            var t6=data['t6'].value;
            var t6_err=data['t6'].err;
            var t2scr=data['t2scr'].value;
            var t2scr_err=data['t2scr'].err;
            var t3scr=data['t3scr'].value;
            var t3scr_err=data['t3scr'].err;
            var t4scr=data['t4scr'].value;
            var t4scr_err=data['t4scr'].err;
            var t5scr=data['t5scr'].value;
            var t5scr_err=data['t5scr'].err;
            var bpProcentOtVsego=data['bpProcentOtVsego'].value;
            var bpProcentOtVsego_err=data['bpProcentOtVsego'].err;
            var bpRezhim=data['bpRezhim'].value;
            var bpRezhim_err=data['bpRezhim'].err;
        }
        //Тело программы
        //
        //
            var m1rashod_ = fanIn / 10 * bp_func(bpRezhim, bp, bpProcentOtVsego);
            var m2rashod_ = fanOut / 10;
            
            
            if (nkp) {
                t11 = ten (t1, m1rashod ,m1rashod_, q1,shimNKP);
            } else {
                t11=t1;
            }; //Преднагрев
            
            var recup = recuperator(m1rashod, m1rashod_, m2rashod, m2rashod_, t11, t6, kpdRecuper); //Рекуператор
            var t2 = (t2scr)?recup[0]:t2i;
            var t4 = (t4scr)?recup[1]:t4i;
            
            if (nkd && t5scr) {
                t5ii = ten(t4, m1rashod ,m1rashod_, q1, (out1 * 10));
            } 
            else if (!nkp) {
                t5ii = recup[1];
            }
            else {t5ii = t4;}; //Основной нагреватель (Электро)




            //Write tags for tag group OutPLS
            var options={};
            options['name']="OutPLS";
            options['values'] = {};
            options['values']['t2i']=t2;
            (t3scr) ? options['values']['t3i']=32 : options['values']['t3i']=t3i;
            options['values']['t4i']=t4;
            options['values']['t5i']=t5ii;
            options['values']['t6i']=t6;
            myscada.writeTags(options, function (err,data){
              if (err){
                //write error
              }
            });
  
            //Write tags for tag group Out
            var options2={};
            options2['name']="Out";
            options2['values'] = {};
            options2['values']['t11']=t11;
            options2['values']['tt4']=t2;
            options2['values']['tt2']=t4;
            options2['values']['tt5']=t5ii;
            myscada.writeTags(options2, function (err,data){
              if (err){
                //write error
              }
            });
            
});
});
});
}, 1000);



function ten(tIn, w, w_proc, q, q_) { 
    //w - расход, q - элТен
    
    if (w>0 && w_proc>0 && q_>0 && q>0)
    {
    var tOut = (q * q_ * 10 / (0.27912) / (1.225) / (w*w_proc))+tIn;
    }
    else 
    {
        tOut = tIn;
    }
    
    return tOut;
};
//
//function kkbDiscr(tIn, w, w_proc, q, q_=1) { 
//    //w - расход, q - KKB
//    
//    if (w>0 && w_proc>0 && q_>0 && q>0)
//    {
//    var tOut = (q * q_ * 10 / (0.27912) / (1.225) / (w*w_proc))+tIn;
//    }
//    else {tOut = tIn;}
//    
//    return tOut;
//};

function bp_func(bpRezhim, bp, bpProcentOtVsego) 
{ 
    //k - koeficient of air walking through recuperator
    //bpRezhim 0-no BP, 1-discr BP, 2 - analog
    var k;
    if (bpRezhim === 0)
    {
        k = 1;
    }
    else if (bpRezhim === 1)
    {
        if (bp !== 0)
        {
            k = 1 / (1 - 100 * bp) * (1 - bpProcentOtVsego/100) ;
        }
        else k=1;
    }
    else if (bpRezhim === 1)
    {
        k = 1;
    };
       
    return k;
};
   
function recuperator(w1, w1_, w2, w2_, t1, t6, kpd) 
{
    var t4, t2;
    
    if (w1>0.1 && w2>0.1 && w1_>0.1 && w2_>0.1)
    {
        var k = (w1 * w1_) / (w2 * w2_);
        if (kpd === 0 )
        {
            t2 = t6;
            t4 = t1;
        } 
        else if (k >= 1)
        {
            t4 = t1 + 1 / k * (t6 - t1) * kpd / 100;
            t2 = k * (t1 - t4) + t6;
        } else 
        {
            t2 = t6 - k * (t6 - t1) / kpd / 100;
            t4 = 1 / k * (t6 - t2) + t1;
        };
    }
    else 
    {
        if (w1 <= 0.1 || w1_ <= 0.1) {t4 = t6;} else {t4 = t1;}
        if (w2 <= 0.1 || w2_ <= 0.1) {t2 = t1;} else {t2 = t6;}
    }    ;
    return [t2 , t4];
};   


////process data sent from the view script
////in view script, please, use function myscada.sendDataToServerSideScript
//myscada.dataFromViewScripts = function (data,callback)
//{
//	//process data
//
//	//return value back to view script
//	//you must always return a value even empty
//	callback("return value");
//};
//


