import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Globe, MapPin, ExternalLink, Briefcase, Quote, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface CardProps {
    user: User;
}

export function Cards({ user }: CardProps) {
    return (
        <HoverBorderGradient className="rounded-xl">
            <Card className="w-full overflow-hidden transition-all border-none h-full">
                <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary shadow-md">
                            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${user.name}`} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">{user.name}</CardTitle>
                                <Badge variant="outline" className="ml-2 bg-primary/10">Active User</Badge>
                            </div>
                            <CardDescription className="flex items-center gap-1 mt-1">
                                <Badge variant="secondary" className="px-2 py-0">{user.username}</Badge>
                                <span className="text-xs text-muted-foreground">@{user.company.name}</span>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid gap-4 text-sm">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <a href={`mailto:${user.email}`} className="text-foreground hover:text-primary hover:underline transition-colors">
                                    {user.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>{user.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-primary" />
                                <a href={`http://${user.website}`} className="text-foreground hover:text-primary hover:underline transition-colors group flex items-center gap-1" target="_blank" rel="noreferrer">
                                    {user.website}
                                    <ExternalLink className="h-3 w-3 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-primary mt-1" />
                                <span>
                                    {user.address.street}, {user.address.suite}
                                    <br />
                                    {user.address.city}, {user.address.zipcode}
                                </span>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-border">
                            <div className="flex items-start gap-2 mt-2">
                                <Briefcase className="h-4 w-4 text-primary mt-1" />
                                <div>
                                    <div className="font-medium">{user.company.name}</div>
                                    <div className="text-muted-foreground text-xs">{user.company.bs}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 mt-2">
                                <Quote className="h-4 w-4 text-primary mt-1" />
                                <div className="italic text-xs text-muted-foreground">"{user.company.catchPhrase}"</div>
                            </div>
                        </div>

                        {/* User Bio Section */}
                        <div className="pt-2 border-t border-border">
                            <div className="flex items-start gap-2 mt-2">
                                <UserCircle2 className="h-4 w-4 text-primary mt-1" />
                                <div>
                                    <div className="font-medium">About</div>
                                    <p className="text-xs text-muted-foreground">
                                        {user.name} is a user based in {user.address.city} working with {user.company.name}.
                                        You can reach them via email or through their website.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2 border-t bg-muted/10 px-6 py-4 mt-4">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                        <UserCircle2 className="h-4 w-4" />
                        View Profile
                    </Button>
                    <Button size="sm" className="w-full gap-1">
                        <Mail className="h-4 w-4" />
                        Contact
                    </Button>
                </CardFooter>
            </Card>
        </HoverBorderGradient>
    );
}
