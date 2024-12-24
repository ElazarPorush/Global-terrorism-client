import { Button, Input, Label } from '@fluentui/react-components'
import React, { FormEvent, useState } from 'react'
import { addNewAttack } from '../../../fetchs/addNewAttack';
import { AddAttack } from '../../../types/addAttack';

export default function Add() {
    const [attack, setAttack] = useState<AddAttack>({ iyear: 1980, imonth: 1, city: '', latitude: 0, longitude: 0, attacktype1_txt: '', gname: '', nkill: 0, nwound: 0 });
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await addNewAttack('api/analysis/add-new-attack/', attack);
        alert('Attack added successfully');
    };
    return (
        <div className='add'>
            <h1>Add Attack</h1>
            <form onSubmit={handleSubmit} style={{width: '300px'}}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >
                    <Label htmlFor={'year'}>Year</Label>
                    <Input
                        value={attack.iyear.toString()}
                        onChange={(e) => { setAttack({ ...attack, iyear: +e.target.value }) }}
                        appearance="underline"
                        required
                        min={0}
                        type="number"
                        id={'year'}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >
                    <Label htmlFor={'month'}>Month</Label>
                    <Input
                        value={attack.imonth.toString()}
                        onChange={(e) => { setAttack({ ...attack, imonth: +e.target.value }) }}
                        appearance="underline"
                        required
                        min={1}
                        max={12}
                        type="number"
                        id={'month'}
                    />
                </div>
                
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >
                    <Label htmlFor={'city'}>City</Label>
                    <Input
                        value={attack.city}
                        onChange={(e) => { setAttack({ ...attack, city: e.target.value }) }}
                        appearance="underline"
                        required
                        type="text"
                        id={'city'}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >    
                    <Label htmlFor={'latitude'}>Latitude</Label>
                    <Input
                        value={attack.latitude.toString()}
                        onChange={(e) => { setAttack({ ...attack, latitude: +e.target.value }) }}
                        appearance="underline"
                        required
                        type="number"
                        id={'latitude'}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >    
                    <Label htmlFor={'longitude'}>Longitude</Label>
                    <Input
                        value={attack.longitude.toString()}
                        onChange={(e) => { setAttack({ ...attack, longitude: +e.target.value }) }}
                        appearance="underline"
                        required
                        type="number"
                        id={'longitude'}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >    
                    <Label htmlFor={'attacktype1_txt'}>Attack Type</Label>
                    <Input
                        value={attack.attacktype1_txt}
                        onChange={(e) => { setAttack({ ...attack, attacktype1_txt: e.target.value }) }}
                        appearance="underline"
                        required
                        type="text"
                        id={'attacktype1_txt'}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >    
                    <Label htmlFor={'gname'}>Group Name</Label>
                    <Input
                        value={attack.gname}
                        onChange={(e) => { setAttack({ ...attack, gname: e.target.value }) }}
                        appearance="underline"
                        required
                        type="text"
                        id={'gname'}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >
                    <Label htmlFor={'nkill'}>Killed</Label>
                    <Input
                        value={attack.nkill.toString()}
                        onChange={(e) => { setAttack({ ...attack, nkill: +e.target.value }) }}
                        appearance="underline"
                        required
                        type="number"
                        id={'nkill'}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '80%',
                        padding: '1em',
                    }}
                >
                    <Label htmlFor={'nwound'}>Wounded</Label>
                    <Input
                        value={attack.nwound.toString()}
                        onChange={(e) => { setAttack({ ...attack, nwound: +e.target.value }) }}
                        appearance="underline"
                        required
                        type="number"
                        id={'nwound'}
                    />
                </div>

                <Button style={{ margin: '1em' }} appearance="primary" type="submit">
                    Save
                </Button>
            </form>
        </div>
    )
}
